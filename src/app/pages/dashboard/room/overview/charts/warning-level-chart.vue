<template>
   <ApexChart
      ref="chart"
      type="bar"
      :height="300"
      :options="warningLevelDistributionChartOptions"
      :series="warningLevelDistributionSeries"
   ></ApexChart>
</template>

<script setup lang="ts">
import { useThemeVars } from "naive-ui";
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
const themeVars = useThemeVars();
const monitorLogs = inject(MONITOR_LOGS_INJECTION_KEY)!;
const students = inject(STUDENTS_MAP_INJECTION_KEY)!;
const warningLevels = computed(() => {
   const levels = [
      { name: "Low", count: 0, color: themeVars.value.successColorSuppl },
      { name: "Moderate", count: 0, color: themeVars.value.warningColorSuppl },
      { name: "Severe", count: 0, color: themeVars.value.errorColorSuppl },
   ];

   monitorLogs.value
      .filter((log) => students.value.get(log.studentId)?.permitted)
      .forEach((log) => {
         if (log.warningLevel === "low") levels[0].count += 1;
         else if (log.warningLevel === "moderate") levels[1].count += 1;
         else levels[2].count += 1;
      });

   return levels;
});

const warningLevelDistributionSeries = computed(() => [
   {
      name: "Warnings",
      data: warningLevels.value.map((l) => l.count),
   },
]);

const chartId = crypto.randomUUID();
const warningLevelDistributionChartOptions = computed(() =>
   deepMerge(apexChartOverrides, {
      chart: {
         id: chartId,
         type: "bar",
         toolbar: { show: props.static ? false : true },
         zoom: { allowMouseWheelZoom: false },
         animations: {
            enabled: props.static ? false : true,
         },
      },
      plotOptions: {
         bar: {
            horizontal: false,
            distributed: true,
            columnWidth: "50%",
         },
      },
      colors: warningLevels.value.map((l) => l.color),
      xaxis: {
         categories: warningLevels.value.map((l) => l.name),
         title: { text: "Warning Level" },
      },
      yaxis: {
         title: { text: "Warning Count" },
      },
      dataLabels: { enabled: true },
      theme: { mode: props.theme },
   } as ApexCharts.ApexOptions),
);
defineExpose({ chart });
</script>
