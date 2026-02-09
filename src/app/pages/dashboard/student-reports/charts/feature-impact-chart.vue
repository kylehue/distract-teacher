<template>
   <div class="flex flex-col">
      <ApexChart
         ref="chart"
         type="area"
         :height="500"
         :options="featureImpactChartOptions"
         :series="featureImpactSeries"
      />
      <NText :depth="3" class="text-xs">
         Tip: Hold <kbd>CTRL</kbd> and click on a point to view.
      </NText>
   </div>
</template>

<script setup lang="ts">
import { useThemeVars, NText } from "naive-ui";
import { computed, inject, useTemplateRef } from "vue";
import ApexChart from "vue3-apexcharts";
import { deepMerge } from "@/lib/object";
import { apexChartOverrides } from "@/lib/theme-overrides";
import { MONITOR_LOGS_INJECTION_KEY } from "@/lib/injection-keys";
import { MonitorLog } from "@/lib/typings";
import { timestampToTimeString } from "@/lib/datetime";
import { useRouter } from "vue-router";
import { FEATURE_GROUPS_MAP, groupFeatureImpacts } from "@/lib/reports";

const props = defineProps<{
   theme: "light" | "dark";
   static?: boolean;
}>();

const chart = useTemplateRef("chart");
const themeVars = useThemeVars();
const router = useRouter();
const monitorLogs = inject(MONITOR_LOGS_INJECTION_KEY)!;

const featureImpactTimeline = computed(() => {
   return monitorLogs.value.map((log) => {
      return {
         time: timestampToTimeString(log.createdAt, false, true),
         grouped: groupFeatureImpacts(log.featureImpacts),
      };
   });
});

const featureImpactSeries = computed(() => {
   const featureSeries = Array.from(
      new Set(Object.values(FEATURE_GROUPS_MAP)),
   ).map((group) => ({
      name: group,
      data: featureImpactTimeline.value.map(
         (entry) => entry.grouped[group] ?? 0,
      ),
   }));

   const integrityOverTimeSeries = {
      name: "Integrity Score",
      type: "line",
      data: monitorLogs.value.map((log) => log.integrityScore),
   };

   return [integrityOverTimeSeries, ...featureSeries];
});

const chartId = crypto.randomUUID();
const featureImpactChartOptions = computed(() =>
   deepMerge(apexChartOverrides, {
      chart: {
         id: chartId,
         type: "area",
         stacked: true,
         toolbar: { show: props.static ? false : true },
         zoom: { allowMouseWheelZoom: false },
         animations: {
            enabled: props.static ? false : true,
         },

         events: {
            markerClick: (
               event: MouseEvent,
               chartContext,
               { seriesIndex, dataPointIndex, config },
            ) => {
               const log = monitorLogs.value[dataPointIndex];
               if (event.ctrlKey) {
                  router.replace({
                     query: { monitorLogId: log.id },
                  });
               }
            },
         },
      },
      xaxis: {
         categories: featureImpactTimeline.value.map((e) => e.time),
         title: { text: "Time" },
      },
      yaxis: {
         title: { text: "Impact Strength" },
         labels: {
            formatter: (v: number) => (v * 100).toFixed(0) + "%",
         },
      },
      stroke: {
         curve: "straight",
         width: [2, 1, 1, 1, 1, 1],
      },
      tooltip: {
         shared: true,
         y: {
            formatter: (val: number) => (val * 100).toFixed(2) + "%",
         },
      },
      fill: {
         type: [
            "solid",
            "gradient",
            "gradient",
            "gradient",
            "gradient",
            "gradient",
         ],
         gradient: {
            enabled: true,
            opacityFrom: 0.6,
            opacityTo: 0.1,
         },
      },
      colors: [
         themeVars.value.primaryColor,
         "#4CAF50",
         "#FF9800",
         "#F44336",
         "#2196F3",
         "#9C27B0",
         "#FFEB3B",
      ],
      dataLabels: { enabled: false },
      legend: { position: "right" },
      theme: { mode: props.theme },
   } as ApexCharts.ApexOptions),
);

defineExpose({ chart });
</script>
