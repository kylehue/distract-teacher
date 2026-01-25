<template>
   <ApexCharts
      type="bar"
      :options="featureImpactChartOptions"
      :series="groupedFeatureData.series"
   />
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { MonitorLog } from "@/lib/typings";
import ApexCharts, { VueApexChartsComponentProps } from "vue3-apexcharts";
import { groupFeatureImpacts } from "@/lib/reports";
import { deepMerge } from "@/lib/object";
import { apexChartOverrides } from "@/lib/theme-overrides";
import { THEME_INJECTION_KEY } from "@/lib/injection-keys";

const theme = inject(THEME_INJECTION_KEY)!;

interface Props extends /* @vue-ignore */ Omit<
   VueApexChartsComponentProps,
   "type" | "options" | "series"
> {
   monitorLog: MonitorLog;
}

const props = defineProps<Props>();

const groupedFeatureData = computed(() => {
   const groupTotals: Record<string, number> = groupFeatureImpacts(
      props.monitorLog.featureImpacts,
   );

   // convert to percentage and sort descending
   const sortedGroups = Object.entries(groupTotals)
      .map(([group, value]) => ({ group, percentage: value * 100 }))
      .filter((g) => Number(g.percentage.toFixed(1)) > 0)
      .sort((a, b) => b.percentage - a.percentage);

   return {
      categories: sortedGroups.map((g) => g.group),
      series: [
         {
            name: "Impact %",
            data: sortedGroups.map((g) => g.percentage.toFixed(2)),
         },
      ],
   };
});

const featureImpactChartOptions = computed(() =>
   deepMerge(apexChartOverrides, {
      chart: {
         type: "bar",
         toolbar: { show: false },
         animations: { enabled: true },
      },
      plotOptions: {
         bar: {
            horizontal: true,
            barHeight: "50%",
            dataLabels: { position: "top" },
         },
      },
      dataLabels: {
         enabled: true,
         formatter: (val: number) => `${val.toFixed(1)}%`,
         style: { fontSize: "12px" },
      },
      xaxis: {
         categories: groupedFeatureData.value.categories,
         title: { text: "Impact %" },
         min: 0,
      },
      yaxis: {
         title: { text: undefined },
      },
      tooltip: {
         y: {
            formatter: (val: number) => `${val.toFixed(2)}%`,
         },
      },
      theme: { mode: theme.value },
   } as ApexCharts.ApexOptions),
);
</script>
