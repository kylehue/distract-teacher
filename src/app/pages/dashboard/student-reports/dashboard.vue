<template>
   <template v-if="!student || !room || !teacher">Missing data</template>
   <div v-else class="grid gap-4">
      <div class="grid gap-4 print-entity mt-4">
         <NText class="text-xl font-medium">General Information</NText>
         <div class="grid grid-cols-2 gap-4">
            <NCard title="" content-class="flex flex-wrap gap-x-16 gap-y-8">
               <Statistic title="Student Name" size="large">
                  {{ student.name }}
               </Statistic>
            </NCard>
            <NCard title="" content-class="flex flex-wrap gap-x-16 gap-y-8">
               <Statistic title="Teacher Name" size="large">
                  {{ teacher.displayName }}
               </Statistic>
            </NCard>
         </div>
         <div class="flex flex-wrap gap-4">
            <NCard
               title="Room / Session"
               class="lg:flex-1"
               content-class="flex flex-wrap gap-x-16 gap-y-8"
            >
               <template #header-extra>
                  <RouterLink
                     :to="`/dashboard/rooms/${room.id}`"
                     target="_blank"
                  >
                     <NButton circle size="small" quaternary>
                        <PhArrowSquareOut />
                     </NButton>
                  </RouterLink>
               </template>
               <Statistic title="Room Title">
                  <RouterLink :to="`/dashboard/rooms/${room.id}`" class="link">
                     {{ room.title }}
                  </RouterLink>
               </Statistic>
               <Statistic title="Room Code">
                  {{ room.code }}
               </Statistic>
               <Statistic title="Date Created">
                  <Timestamp
                     :value="room.createdAt"
                     absolute
                     date-only
                     simple-date
                  />
               </Statistic>
               <Statistic v-if="room.timeStarted" title="Monitoring Start Time">
                  <Timestamp
                     :value="room.timeStarted"
                     absolute
                     time-only
                     exclude-seconds
                  />
               </Statistic>
               <Statistic v-if="room.timeEnded" title="Monitoring End Time">
                  <Timestamp
                     :value="room.timeEnded"
                     absolute
                     time-only
                     exclude-seconds
                  />
               </Statistic>
               <Statistic title="Student Join Time">
                  <Timestamp
                     :value="student.timeJoined"
                     absolute
                     time-only
                     exclude-seconds
                  />
               </Statistic>
               <Statistic v-if="student.timeLeft" title="Student Leave Time">
                  <Timestamp
                     :value="student.timeLeft"
                     absolute
                     time-only
                     exclude-seconds
                  />
               </Statistic>
               <Statistic
                  v-if="room.timeStarted && student.timeLeft"
                  title="Time Spent In Room Session"
               >
                  {{ totalTime(room.timeStarted, student.timeLeft) }}
               </Statistic>
            </NCard>
         </div>
      </div>
      <div class="grid gap-4 print-entity mt-8">
         <NText class="text-xl font-medium">Statistics</NText>
         <div class="flex-1 grid grid-cols-1 lg:grid-cols-3 grid-rows-1 gap-4">
            <NCard>
               <Statistic title="Integrity Score Average" size="large">
                  <template #title-suffix>
                     <InfoTooltip>
                        The mean integrity score across all monitor logs for
                        this student.
                     </InfoTooltip>
                  </template>
                  {{ (reports.integrityScoreAverage * 100).toFixed(2) }}%
               </Statistic>
               <NText :depth="3" class="text-xs">
                  {{ reports.integritySummary }}
               </NText>
            </NCard>
            <NCard>
               <Statistic
                  title="Integrity Score Standard Deviation"
                  size="large"
               >
                  <template #title-suffix>
                     <InfoTooltip>
                        The standard deviation of integrity scores across all
                        monitor logs for this student. A lower value indicates
                        more consistent performance. E.g., a standard deviation
                        of 0% means the student had the same integrity score for
                        all logs.
                     </InfoTooltip>
                  </template>
                  {{ (reports.standardDeviation * 100).toFixed(2) }}%
               </Statistic>
               <NText :depth="3" class="text-xs">
                  {{ reports.standardDeviationSummary }}
               </NText>
            </NCard>
            <NCard>
               <Statistic title="Phone Activity Count" size="large">
                  <template #title-suffix>
                     <InfoTooltip>
                        The total number of times phone activity was detected
                        for this student.
                     </InfoTooltip>
                  </template>
                  {{ reports.phoneDetectionCount }}
               </Statistic>
            </NCard>
         </div>
         <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
               class="flex-1 grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4"
            >
               <NCard>
                  <Statistic title="Total Number of Warnings" size="large">
                     <template #title-suffix>
                        <InfoTooltip>
                           The total number of warnings for this student.
                        </InfoTooltip>
                     </template>
                     {{ monitorLogs.length }}
                  </Statistic>
               </NCard>
               <NCard>
                  <Statistic
                     title="Log Count Ratio / Expected Log Count Ratio"
                     size="large"
                  >
                     <template #title-suffix>
                        <InfoTooltip>
                           The ratio of the student's actual monitor log count
                           to the expected monitor log count based on the
                           duration of the room session. A ratio close to 1
                           suggests that the number of logs recorded aligns with
                           expectations, while a significantly lower ratio may
                           indicate unusual disconnects, technical issues, or
                           atypical student behavior.
                        </InfoTooltip>
                     </template>
                     {{ studentLogCountRatio }}
                  </Statistic>
               </NCard>
            </div>
            <NCard title="Log Count Z-Score">
               <template #header-extra>
                  <InfoTooltip>
                     The Z-score indicates how many standard deviations the
                     student's log count is from the mean log count of all
                     students in the session. A positive Z-score means the
                     student has more logs than average, while a negative
                     Z-score indicates fewer logs than average.
                  </InfoTooltip>
               </template>
               <LogCountChart :theme="props.theme" :static="props.static" />
            </NCard>
         </div>
      </div>
      <div class="grid gap-4 print-entity mt-8">
         <NText class="text-xl font-medium">Performance Analytics</NText>
         <div class="grid grid-cols-1 gap-4">
            <NCard title="Integrity Score Over Time">
               <IntegrityScoreChart
                  :theme="props.theme"
                  :static="props.static"
               />
            </NCard>
         </div>
         <div class="grid grid-cols-1 gap-4" :data-print-new-page="true">
            <NCard title="Feature Impacts Over Time">
               <FeatureImpactChart
                  :theme="props.theme"
                  :static="props.static"
               />
            </NCard>
         </div>
      </div>
      <div class="grid gap-4 print-entity">
         <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <NCard title="Warning Distribution">
               <WarningLevelChart :theme="props.theme" :static="props.static" />
            </NCard>
         </div>
         <NCard title="Findings">
            <NText :depth="3">
               {{ reports.findings }}
            </NText>
         </NCard>
      </div>
   </div>
</template>

<script setup lang="ts">
import { PhArrowSquareOut } from "@phosphor-icons/vue";
import { NButton, NText, NCard } from "naive-ui";
import { computed, inject } from "vue";
import { RouterLink } from "vue-router";
import { totalTime } from "@/lib/datetime";
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
import Timestamp from "@/app/components/timestamp.vue";
import Statistic from "@/app/components/statistic.vue";

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
