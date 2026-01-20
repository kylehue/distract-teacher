<template>
   <template v-if="!student || !room || !teacher">Missing data</template>
   <div v-else class="grid gap-4">
      <NText class="text-xl font-medium mt-4">General Information</NText>
      <div class="grid grid-cols-2 gap-4">
         <NCard
            title=""
            content-class="flex flex-wrap gap-x-16 gap-y-8"
            :bordered="false"
         >
            <NStatistic label="Student Name">
               {{ student.name }}
            </NStatistic>
         </NCard>
         <NCard
            title=""
            content-class="flex flex-wrap gap-x-16 gap-y-8"
            :bordered="false"
         >
            <NStatistic label="Teacher Name">
               {{ teacher.displayName }}
            </NStatistic>
         </NCard>
      </div>
      <div class="flex flex-wrap gap-4">
         <NCard
            title="Room / Session"
            class="lg:flex-1"
            content-class="flex flex-wrap gap-x-16 gap-y-8"
            :bordered="false"
         >
            <template #header-extra>
               <RouterLink :to="`/dashboard/rooms/${room.id}`" target="_blank">
                  <NButton circle size="small" quaternary>
                     <PhArrowSquareOut />
                  </NButton>
               </RouterLink>
            </template>
            <NStatistic label="Room Title">
               {{ room.title }}
            </NStatistic>
            <NStatistic label="Room Code">
               {{ room.code }}
            </NStatistic>
            <NStatistic label="Date">
               {{ timestampToDateString(room.createdAt) }}
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
         <div class="flex-1 grid grid-cols-2 grid-rows-2 gap-4">
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
            <IntegrityScoreChart :theme="props.theme" :static="props.static" />
         </NCard>
      </div>
      <div class="grid grid-cols-1 gap-4" data-print-new-page>
         <NCard title="Feature Impacts Over Time" :bordered="false">
            <FeatureImpactChart :theme="props.theme" :static="props.static" />
         </NCard>
      </div>
      <div class="grid grid-cols-2 gap-4">
         <NCard title="Warning Distribution" :bordered="false">
            <WarningLevelChart :theme="props.theme" :static="props.static" />
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
import { computed, inject, useTemplateRef } from "vue";
import { RouterLink } from "vue-router";
import {
   timestampToDateString,
   timestampToTimeString,
   totalTime,
} from "@/lib/datetime";
import {
   computeStdDev,
   explainIntegrity,
   explainIntegrityAndStdDev,
   explainStdDev,
} from "@/lib/reports";
import IntegrityScoreChart from "./charts/integrity-score-chart.vue";
import FeatureImpactChart from "./charts/feature-impact-chart.vue";
import WarningLevelChart from "./charts/warning-level-chart.vue";
import {
   MONITOR_LOGS_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENT_INJECTION_KEY,
   TEACHER_INJECTION_KEY,
} from "@/lib/injection-keys";

const props = defineProps<{
   theme: "light" | "dark";
   static?: boolean;
}>();

const student = inject(STUDENT_INJECTION_KEY)!;
const room = inject(ROOM_INJECTION_KEY)!;
const teacher = inject(TEACHER_INJECTION_KEY)!;
const monitorLogs = inject(MONITOR_LOGS_INJECTION_KEY)!;

// Calculations
const integrityScoreAvg = computed(() => {
   if (monitorLogs.value.length === 0) return 0;
   const sum = monitorLogs.value.reduce(
      (acc, log) => acc + log.integrityScore,
      0,
   );
   return sum / monitorLogs.value.length;
});

const stdDev = computed(() => {
   const scores = monitorLogs.value.map((log) => log.integrityScore);
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
</script>
