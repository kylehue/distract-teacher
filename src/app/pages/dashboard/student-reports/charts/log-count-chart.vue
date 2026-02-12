<template>
   <div class="flex flex-col">
      <ApexChart
         ref="chart"
         type="area"
         :height="220"
         :options="zScoreChartOptions"
         :series="zScoreSeries"
      />
      <NText v-if="studentIndividualReport" :depth="3" class="text-xs">
         {{ studentIndividualReport.explanation }}
      </NText>
   </div>
</template>

<script setup lang="ts">
import { computed, inject, useTemplateRef } from "vue";
import ApexChart from "vue3-apexcharts";
import { deepMerge } from "@/lib/object";
import { apexChartOverrides } from "@/lib/theme-overrides";
import { NText, useThemeVars } from "naive-ui";
import { createStudentsIndividualReports } from "@/lib/reports";
import {
   STUDENTS_MAP_INJECTION_KEY,
   STUDENT_INJECTION_KEY,
} from "@/lib/injection-keys";

const props = defineProps<{
   theme: "light" | "dark";
   static?: boolean;
}>();

const themeVars = useThemeVars();
const chart = useTemplateRef("chart");
const chartId = crypto.randomUUID();

const MIN_Z = -4;
const MAX_Z = 4;

const allStudents = inject(STUDENTS_MAP_INJECTION_KEY)!;
const student = inject(STUDENT_INJECTION_KEY)!;

const studentIndividualReport = computed(() =>
   createStudentsIndividualReports(Array.from(allStudents.value.values())).get(
      student.value!.id,
   ),
);

const zScore = computed(() => {
   const v = studentIndividualReport.value?.zScore;
   return Number.isFinite(v as number) ? (v as number) : 0;
});

const clampedZ = computed(() => Math.min(MAX_Z, Math.max(MIN_Z, zScore.value)));

function normalPdf(x: number) {
   const invSqrt2Pi = 0.3989422804014327;
   return invSqrt2Pi * Math.exp(-0.5 * x * x);
}

const pdfPoints = computed(() => {
   const pts: Array<{ x: number; y: number }> = [];
   const points = 200;
   const step = (MAX_Z - MIN_Z) / points;

   for (let x = MIN_Z; x <= MAX_Z + step / 2; x += step) {
      const xx = Math.min(MAX_Z, x);
      pts.push({ x: xx, y: normalPdf(xx) });
      if (xx === MAX_Z) break;
   }

   return pts;
});

const zScoreSeries = computed(() => [
   {
      name: "Probability Density",
      data: pdfPoints.value,
   },
]);
const zScoreChartOptions = computed(() => {
   return deepMerge(apexChartOverrides, {
      chart: {
         id: chartId,
         type: "area",
         zoom: { allowMouseWheelZoom: false },
         toolbar: { show: props.static ? false : true },
         animations: { enabled: props.static ? false : true },
      },

      dataLabels: { enabled: false },

      xaxis: {
         type: "numeric",
         min: MIN_Z,
         max: MAX_Z,
         tickAmount: 8,
         title: { text: "Z-Score" },
         labels: { formatter: (val: number) => val.toFixed(1) },
      },

      yaxis: {
         min: 0,
         title: { text: "Probability Density" },
         labels: { formatter: (val: number) => val.toFixed(2) },
      },

      stroke: { curve: "smooth", width: 2 },
      fill: { type: "solid", opacity: 0.25 },
      markers: { size: 0 },

      grid: {
         padding: { left: 10, right: 10, top: 10, bottom: 10 },
      },

      tooltip: {
         x: { formatter: (val: number) => `${val.toFixed(2)}σ` },
         y: { formatter: (val: number) => val.toFixed(4) },
      },
      annotations: {
         xaxis: [
            {
               x: -1,
               x2: 1,
               fillColor: themeVars.value.successColorSuppl,
               opacity: 0.21,
               borderColor: "transparent",
               strokeDashArray: 0,
            },
            {
               x: 1,
               x2: 2,
               fillColor: themeVars.value.warningColorSuppl,
               opacity: 0.21,
               borderColor: "transparent",
               strokeDashArray: 0,
            },
            {
               x: -2,
               x2: -1,
               fillColor: themeVars.value.warningColorSuppl,
               opacity: 0.21,
               borderColor: "transparent",
               strokeDashArray: 0,
            },
            {
               x: 2,
               x2: MAX_Z,
               fillColor: themeVars.value.errorColorSuppl,
               opacity: 0.21,
               borderColor: "transparent",
               strokeDashArray: 0,
            },
            {
               x: MIN_Z,
               x2: -2,
               fillColor: themeVars.value.errorColorSuppl,
               opacity: 0.21,
               borderColor: "transparent",
               strokeDashArray: 0,
            },

            // keep vertical student line separate
            {
               x: clampedZ.value,
               borderColor: themeVars.value.primaryColor,
               borderWidth: 1,
               strokeDashArray: 4,
               opacity: 1,
               label: {
                  text: `${zScore.value.toFixed(2)}`,
                  position: "top",
                  orientation: "horizontal",
                  borderColor: "transparent",
                  offsetY: -8,
                  style: {
                     background: "rgba(0,0,0,0)",
                     color: themeVars.value.primaryColor,
                  },
               },
            },
         ],
      },

      theme: { mode: props.theme },
   } as ApexCharts.ApexOptions);
});

defineExpose({ chart });
</script>
