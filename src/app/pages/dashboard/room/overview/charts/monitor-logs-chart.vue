<template>
   <ApexChart
      ref="chart"
      type="scatter"
      :height="400"
      :options="scatterChartOptions"
      :series="scatterSeries"
   />
</template>

<script setup lang="ts">
import { computed, inject, useTemplateRef } from "vue";
import ApexChart from "vue3-apexcharts";
import { deepMerge } from "@/lib/object";
import { apexChartOverrides } from "@/lib/theme-overrides";
import {
   MONITOR_LOGS_INJECTION_KEY,
   STUDENTS_MAP_INJECTION_KEY,
} from "@/lib/injection-keys";

const props = defineProps<{
   theme: "light" | "dark";
   static?: boolean;
}>();

const chart = useTemplateRef("chart");
const monitorLogs = inject(MONITOR_LOGS_INJECTION_KEY)!;
const students = inject(STUDENTS_MAP_INJECTION_KEY)!;

/**
 * Scatter series: x = timestamp, y = integrity score
 */
const scatterSeries = computed(() => [
   {
      name: "Integrity Score",
      data: monitorLogs.value
         .filter((log) => students.value.get(log.studentId)?.permitted)
         .map((log) => ({
            x: new Date(log.createdAt).getTime(),
            y: log.integrityScore,
         })),
   },
]);

const scatterChartOptions = computed(() => {
   return deepMerge(apexChartOverrides, {
      chart: {
         id: "integrity-scatter-chart",
         type: "scatter",
         zoom: { allowMouseWheelZoom: false },
         toolbar: { show: props.static ? false : true },
         animations: {
            enabled: props.static ? false : true,
         },
      },

      markers: {
         size: 4,
         hover: { size: 6 },
      },

      xaxis: {
         type: "datetime",
         title: { text: "Time" },
         labels: {
            datetimeUTC: false,
         },
      },

      yaxis: {
         min: 0,
         max: 1,
         title: { text: "Integrity Score" },
         labels: {
            formatter: (val: number) => (val * 100).toFixed(0) + "%",
         },
      },

      tooltip: {
         x: {
            format: "HH:mm:ss",
         },
         y: {
            formatter: (val: number) => (val * 100).toFixed(2) + "%",
         },
      },

      stroke: {
         width: 0, // important for clean scatter
      },

      theme: { mode: props.theme },
   } as ApexCharts.ApexOptions);
});

defineExpose({ chart });
</script>
