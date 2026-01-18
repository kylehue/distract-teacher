<template>
   <ApexChart
      ref="chart"
      type="line"
      :height="400"
      :options="integrityOverTimeChartOptions"
      :series="integrityOverTimeSeries"
   ></ApexChart>
</template>

<script setup lang="ts">
import { computed, inject, useTemplateRef } from "vue";
import ApexChart from "vue3-apexcharts";
import { deepMerge } from "@/lib/object";
import { apexChartOverrides } from "@/lib/theme-overrides";
import { MONITOR_LOGS_INJECTION_KEY } from "@/lib/injection-keys";
import { timestampToTimeString } from "@/lib/datetime";

const props = defineProps<{
   theme: "light" | "dark";
   static?: boolean;
}>();
const chart = useTemplateRef("chart");
const monitorLogs = inject(MONITOR_LOGS_INJECTION_KEY)!;
const integrityOverTimeSeries = computed(() => [
   {
      name: "Integrity Score",
      data: monitorLogs.value.map((log) => log.integrityScore),
   },
]);

const integrityOverTimeChartOptions = computed(() => {
   return deepMerge(apexChartOverrides, {
      chart: {
         id: "integrity-score-chart",
         type: "line",
         zoom: { allowMouseWheelZoom: false },
         toolbar: { show: props.static ? false : true },
         animations: {
            enabled: props.static ? false : true,
         },
      },
      xaxis: {
         categories: monitorLogs.value.map((log) =>
            timestampToTimeString(log.createdAt, false, true),
         ),
         title: { text: "Time" },
      },
      yaxis: {
         min: 0,
         max: 1,
         title: { text: "Integrity Score" },
         labels: {
            formatter: (val: number) => (val * 100).toFixed(0) + "%",
         },
      },
      stroke: { curve: "smooth", width: 2 },
      tooltip: {
         x: { format: "HH:mm:ss" },
         y: { formatter: (val: number) => (val * 100).toFixed(2) + "%" },
      },
      theme: { mode: props.theme },
   } as ApexCharts.ApexOptions);
});
defineExpose({ chart });
</script>
