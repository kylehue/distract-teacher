<template>
   <div class="grid gap-4">
      <NText class="text-xl font-medium mt-4">General Information</NText>
      <div class="grid grid-cols-2 gap-4">
         <NCard
            title="Student Information"
            content-class="flex flex-wrap gap-x-16 gap-y-8"
            :bordered="false"
         >
            <NStatistic label="Student Name">
               {{ student.name }}
            </NStatistic>
            <NStatistic label="Room">
               {{ room.title }}
               <template #suffix>
                  <RouterLink
                     :to="`/dashboard/rooms/${room.id}`"
                     target="_blank"
                  >
                     <NButton circle size="small" quaternary>
                        <PhArrowSquareOut />
                     </NButton>
                  </RouterLink>
               </template>
            </NStatistic>
            <NStatistic label="Time Joined">
               {{ timestampToTimeString(student.timeJoined) }}
            </NStatistic>
            <NStatistic label="Time Left">
               {{
                  student.timeLeft
                     ? timestampToTimeString(student.timeLeft)
                     : "N/A"
               }}
            </NStatistic>
            <NStatistic label="Time Spent">
               {{ totalTime(student.timeJoined, student.timeLeft) }}
            </NStatistic>
         </NCard>
         <div class="grid grid-cols-2 grid-rows-2 gap-4">
            <NCard :bordered="false">
               <NStatistic label="Total Number of Warnings">
                  {{ monitorLogs.length }}
               </NStatistic>
            </NCard>
            <NCard :bordered="false">
               <NStatistic label="Average Integrity Score">
                  {{ (integrityScoreAvg * 100).toFixed(2) }}%
               </NStatistic>
               <NText :depth="3" class="text-xs">
                  {{ integrityExplanation }}
               </NText>
            </NCard>
            <NCard :bordered="false">
               <NStatistic label="Standard Deviation">
                  {{ (stdDev * 100).toFixed(2) }}%
               </NStatistic>
               <NText :depth="3" class="text-xs">
                  {{ stdDevExplanation }}
               </NText>
            </NCard>
         </div>
      </div>
      <NText class="text-xl font-medium mt-8">Performance Analytics</NText>
      <div class="grid grid-cols-1 gap-4">
         <NCard title="Integrity Score Over Time" :bordered="false">
            <IntegrityScoreChart
               ref="integrityScoreChart"
               :theme="props.theme"
               :static="props.static"
            />
         </NCard>
      </div>
      <div class="grid grid-cols-1 gap-4" data-print-new-page>
         <NCard title="Feature Impacts Over Time" :bordered="false">
            <FeatureImpactChart
               ref="featureImpactChart"
               :theme="props.theme"
               :static="props.static"
            />
         </NCard>
      </div>
      <div class="grid grid-cols-2 gap-4">
         <NCard title="Warning Distribution" :bordered="false">
            <WarningLevelChart
               ref="warningLevelChart"
               :theme="props.theme"
               :static="props.static"
            />
         </NCard>
      </div>
      <NCard title="Findings" :bordered="false">
         <NText :depth="3">
            {{ integrityAndStdDevExplanation }}
         </NText>
      </NCard>
   </div>
</template>

<script setup lang="ts">
import { PhArrowSquareOut } from "@phosphor-icons/vue";
import { NButton, NText, NStatistic, NCard } from "naive-ui";
import { computed, useTemplateRef } from "vue";
import { RouterLink } from "vue-router";
import { timestampToTimeString, totalTime } from "@/lib/datetime";
import {
   computeStdDev,
   explainIntegrity,
   explainIntegrityAndStdDev,
   explainStdDev,
} from "@/lib/reports";
import IntegrityScoreChart from "./charts/integrity-score-chart.vue";
import FeatureImpactChart from "./charts/feature-impact-chart.vue";
import WarningLevelChart from "./charts/warning-level-chart.vue";
import { MonitorLog, RoomInfo, StudentInfo } from "@/lib/typings";

const props = defineProps<{
   student: StudentInfo;
   room: RoomInfo;
   monitorLogs: MonitorLog[];
   theme: "light" | "dark";
   static?: boolean;
}>();

const integrityScoreChart = useTemplateRef("integrityScoreChart");
const featureImpactChart = useTemplateRef("featureImpactChart");
const warningLevelChart = useTemplateRef("warningLevelChart");

// Calculations
const integrityScoreAvg = computed(() => {
   if (props.monitorLogs.length === 0) return 0;
   const sum = props.monitorLogs.reduce(
      (acc, log) => acc + log.integrityScore,
      0,
   );
   return sum / props.monitorLogs.length;
});

const stdDev = computed(() => {
   const scores = props.monitorLogs.map((log) => log.integrityScore);
   return computeStdDev(scores);
});

// Explanations
const integrityAndStdDevExplanation = computed(() => {
   return explainIntegrityAndStdDev(integrityScoreAvg.value, stdDev.value);
});

const integrityExplanation = computed(() => {
   return explainIntegrity(integrityScoreAvg.value);
});

const stdDevExplanation = computed(() => {
   return explainStdDev(stdDev.value);
});

defineExpose({
   integrityScoreChart,
   featureImpactChart,
   warningLevelChart,
});
</script>
