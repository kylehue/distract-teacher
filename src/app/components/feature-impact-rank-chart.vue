<template>
   <ApexCharts
      type="bar"
      :options="featureImpactChartOptions"
      :series="groupedFeatureData.series"
      v-bind="$attrs"
      height="300px"
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
      .sort((a, b) => b.percentage - a.percentage);

   return {
      categories: sortedGroups.map((g) => g.group),
      series: [
         {
            name: "Impact %",
            data: sortedGroups.map((g) => Number(g.percentage.toFixed(2))),
         },
      ],
   };
});

const featureImpactChartOptions = computed(() =>
   deepMerge(apexChartOverrides, {
      chart: {
         id: props.monitorLog.id + "-feature-impact-chart",
         type: "bar",
         toolbar: { show: false },
      },
      plotOptions: {
         bar: {
            horizontal: true,
            barHeight: "50%",
         },
      },
      xaxis: {
         categories: groupedFeatureData.value.categories,
         title: { text: "Impact %" },
         labels: {
            formatter: (v: number) => `${v.toFixed(0)}%`,
         },
      },
      yaxis: {
         labels: {
            formatter: undefined as any,
         },
      },
      dataLabels: {
         enabled: true,
         formatter: (v: number) => `${v.toFixed(2)}%`,
      },
      tooltip: {
         y: {
            formatter: (v: number) => `${v.toFixed(2)}%`,
         },
      },
      annotations: {
         xaxis: [
            {
               x: 0,
               borderWidth: 1,
               strokeDashArray: 4,
               opacity: 1,
            },
         ],
      },
      theme: { mode: theme.value },
   } as ApexCharts.ApexOptions),
);
</script>
