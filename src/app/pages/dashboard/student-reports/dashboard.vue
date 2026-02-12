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
            <NStatistic label="Date Created">
               {{ timestampToDateString(room.createdAt) }}
            </NStatistic>
            <NStatistic label="Monitoring Start Time">
               {{
                  room.timeStarted
                     ? timestampToTimeString(room.timeStarted)
                     : "N/A"
               }}
            </NStatistic>
            <NStatistic label="Monitoring End Time">
               {{
                  room.timeEnded ? timestampToTimeString(room.timeEnded) : "N/A"
               }}
            </NStatistic>
            <NStatistic label="Student Join Time">
               {{ timestampToTimeString(student.timeJoined) }}
            </NStatistic>
            <NStatistic label="Student Leave Time">
               {{
                  student.timeLeft
                     ? timestampToTimeString(student.timeLeft)
                     : "N/A"
               }}
            </NStatistic>
            <NStatistic label="Time Spent In Room Session">
               {{
                  room.timeStarted && student.timeLeft
                     ? totalTime(room.timeStarted, student.timeLeft)
                     : "N/A"
               }}
            </NStatistic>
         </NCard>
      </div>
      <NText class="text-xl font-medium mt-8">Statistics</NText>
      <div class="flex-1 grid grid-cols-1 lg:grid-cols-3 grid-rows-1 gap-4">
         <NCard :bordered="false">
            <NStatistic>
               <template #label>
                  <div class="flex items-center gap-2">
                     Integrity Score Average
                     <InfoTooltip>
                        The mean integrity score across all monitor logs for
                        this student.
                     </InfoTooltip>
                  </div>
               </template>
               {{ (reports.integrityScoreAverage * 100).toFixed(2) }}%
            </NStatistic>
            <NText :depth="3" class="text-xs">
               {{ reports.integritySummary }}
            </NText>
         </NCard>
         <NCard :bordered="false">
            <NStatistic>
               <template #label>
                  <div class="flex items-center gap-2">
                     Integrity Score Standard Deviation
                     <InfoTooltip>
                        The standard deviation of integrity scores across all
                        monitor logs for this student. A lower value indicates
                        more consistent performance. E.g., a standard deviation
                        of 0% means the student had the same integrity score for
                        all logs.
                     </InfoTooltip>
                  </div>
               </template>
               {{ (reports.standardDeviation * 100).toFixed(2) }}%
            </NStatistic>
            <NText :depth="3" class="text-xs">
               {{ reports.standardDeviationSummary }}
            </NText>
         </NCard>
         <NCard :bordered="false">
            <NStatistic>
               <template #label>
                  <div class="flex items-center gap-2">
                     Phone Activity Count
                     <InfoTooltip>
                        The total number of times phone activity was detected
                        for this student.
                     </InfoTooltip>
                  </div>
               </template>
               {{ reports.phoneDetectionCount }}
            </NStatistic>
         </NCard>
      </div>
      <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
         <div
            class="flex-1 grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4"
         >
            <NCard :bordered="false">
               <NStatistic>
                  <template #label>
                     <div class="flex items-center gap-2">
                        Total Number of Warnings
                        <InfoTooltip>
                           The total number of warnings for this student.
                        </InfoTooltip>
                     </div>
                  </template>
                  {{ monitorLogs.length }}
               </NStatistic>
            </NCard>
            <NCard :bordered="false">
               <NStatistic>
                  <template #label>
                     <div class="flex items-center gap-2">
                        Log Count / Expected Log Count Ratio
                        <InfoTooltip>
                           The ratio of the student's actual monitor log count
                           to the expected monitor log count based on the
                           duration of the room session. A ratio close to 1
                           suggests that the number of logs recorded aligns with
                           expectations, while a significantly lower ratio may
                           indicate unusual disconnects, technical issues, or
                           atypical student behavior.
                        </InfoTooltip>
                     </div>
                  </template>
                  {{ studentLogCountRatio }}
               </NStatistic>
            </NCard>
         </div>
         <NCard title="Log Count Z-Score" :bordered="false">
            <template #header-extra>
               <InfoTooltip>
                  The Z-score indicates how many standard deviations the
                  student's log count is from the mean log count of all students
                  in the session. A positive Z-score means the student has more
                  logs than average, while a negative Z-score indicates fewer
                  logs than average.
               </InfoTooltip>
            </template>
            <LogCountChart :theme="props.theme" :static="props.static" />
         </NCard>
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
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
         <NCard title="Warning Distribution" :bordered="false">
            <WarningLevelChart :theme="props.theme" :static="props.static" />
         </NCard>
      </div>
      <NCard title="Findings" :bordered="false">
         <NText :depth="3">
            {{ reports.findings }}
         </NText>
      </NCard>
   </div>
</template>

<script setup lang="ts">
import { PhArrowSquareOut } from "@phosphor-icons/vue";
import { NButton, NText, NStatistic, NCard, NTooltip, NIcon } from "naive-ui";
import { computed, inject, useTemplateRef } from "vue";
import { RouterLink } from "vue-router";
import {
   timestampToDateString,
   timestampToTimeString,
   totalTime,
} from "@/lib/datetime";
import {
   createStudentsIndividualReports,
   createMonitorLogsReports,
   computeExpectedMonitorLogCount,
} from "@/lib/reports";
import IntegrityScoreChart from "./charts/integrity-score-chart.vue";
import FeatureImpactChart from "./charts/feature-impact-chart.vue";
import WarningLevelChart from "./charts/warning-level-chart.vue";
import {
   MONITOR_LOGS_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENT_INJECTION_KEY,
   STUDENTS_MAP_INJECTION_KEY,
   TEACHER_INJECTION_KEY,
} from "@/lib/injection-keys";
import LogCountChart from "./charts/log-count-chart.vue";
import InfoTooltip from "@/app/components/info-tooltip.vue";

const props = defineProps<{
   theme: "light" | "dark";
   static?: boolean;
}>();

const allStudents = inject(STUDENTS_MAP_INJECTION_KEY)!;
const student = inject(STUDENT_INJECTION_KEY)!;
const room = inject(ROOM_INJECTION_KEY)!;
const teacher = inject(TEACHER_INJECTION_KEY)!;
const monitorLogs = inject(MONITOR_LOGS_INJECTION_KEY)!;
const reports = computed(() => createMonitorLogsReports(monitorLogs.value));
const studentIndividualReport = computed(() =>
   createStudentsIndividualReports(Array.from(allStudents.value.values())).get(
      student.value!.id,
   ),
);
const studentLogCountRatio = computed(() =>
   student.value && room.value?.timeStarted && room.value?.timeEnded
      ? (
           student.value.monitorLogCount /
           computeExpectedMonitorLogCount(
              room.value.timeStarted,
              room.value.timeEnded,
           )
        ).toFixed(2)
      : "N/A",
);
</script>
