<template>
   <div class="flex flex-col gap-4">
      <NAlert
         v-if="unpermittedStudentsCount"
         type="warning"
         title="Unpermitted Students"
         closable
      >
         There are currently unpermitted students in the room.
      </NAlert>
      <DataView
         :items="students"
         :item-key="(item) => item.id"
         :loading="loading"
         :page-size-infinite="static"
         :search="{
            fields: ['name'],
            idField: 'id',
            labelField: 'name',
            maxSuggestions: 10,
         }"
         :sort="{
            options: [
               {
                  key: 'name',
                  label: 'Student Name',
                  compare: (a, b) => a.name.localeCompare(b.name),
               },
               {
                  key: 'timeJoined',
                  label: 'Time Joined',
                  compare: (a, b) => moment(a.timeJoined).diff(b.timeJoined),
               },
               {
                  key: 'timeLeft',
                  label: 'Time Left',
                  compare: (a, b) => moment(a.timeLeft).diff(b.timeLeft),
               },
               {
                  key: 'totalWarnings',
                  label: 'Total Warnings',
                  compare: (a, b) =>
                     a.monitorLogs.length - b.monitorLogs.length,
               },
               {
                  key: 'phoneDetections',
                  label: 'Phone Detections',
                  compare: (a, b) =>
                     a.phoneDetectionsCount - b.phoneDetectionsCount,
               },
               {
                  key: 'averageIntegrityScore',
                  label: 'Average Integrity Score',
                  compare: (a, b) =>
                     a.monitorLogsReports.integrityScoreAverage -
                     b.monitorLogsReports.integrityScoreAverage,
               },
               {
                  key: 'integrityScoreStandardDeviation',
                  label: 'Integrity Score Standard Deviation',
                  compare: (a, b) =>
                     a.monitorLogsReports.standardDeviation -
                     b.monitorLogsReports.standardDeviation,
               },
               {
                  key: 'logCountZScore',
                  label: 'Log Count Z-Score',
                  compare: (a, b) =>
                     a.zScoreReports.zScore - b.zScoreReports.zScore,
               },
               {
                  key: 'expectedLogCountRatio',
                  label: 'Expected Log Count Ratio',
                  compare: (a, b) =>
                     a.expectedLogCountRatio - b.expectedLogCountRatio,
               },
            ],
            defaultRules: [{ key: 'name', direction: 'asc' }],
         }"
         :column-filter="{
            columns: [
               {
                  key: 'permitted',
                  label: 'Permit Status',
                  options: [
                     { label: 'Permitted', value: true },
                     { label: 'Unpermitted', value: false },
                  ],
               },
               {
                  key: 'active',
                  label: 'Active Status',
                  options: [
                     { label: 'Active', value: true },
                     { label: 'Inactive', value: false },
                  ],
               },
            ],
            defaultRules: [{ key: 'permitted', values: [true] }],
         }"
      >
         <template #controlsLeft> </template>
         <template #item="{ item: student, index }">
            <RowCard
               class="print-entity"
               bordered
               :data-print-new-page="index % 3 === 0"
               :menu-options="[
                  {
                     label: 'View Reports',
                     to: `/dashboard/student-reports/${student.id}`,
                  },
                  {
                     label: 'View Warnings',
                     to: {
                        name: 'monitoring',
                        query: {
                           filterByStudent: student.id,
                           tab: 'warningLogs',
                        },
                     },
                  },
                  {
                     label: 'Kick',
                     labelProps: { type: 'error' },
                     onSelect() {
                        togglePermit(student, false);
                     },
                     disabled:
                        room.status === 'concluded' ||
                        !student.permitted ||
                        patchDenyPermitStudent.isLoading,
                  },
               ]"
               :tags="[
                  {
                     label: 'Inactive',
                     type: 'default',
                     visible: !student.active,
                  },
                  {
                     label: 'Unpermitted',
                     type: 'error',
                     visible: !student.permitted,
                  },
               ]"
            >
               <template #title>
                  <NText class="flex items-center gap-1">
                     <PhUser />
                     <RouterLink
                        :to="`/dashboard/student-reports/${student.id}`"
                        class="link"
                     >
                        {{ student.name }}
                     </RouterLink>
                  </NText>
               </template>
               <template #content>
                  <div class="flex flex-wrap gap-x-12 gap-y-4">
                     <Statistic title="Total Warnings">
                        <template #icon>
                           <PhWarning />
                        </template>
                        <NTooltip>
                           <template #trigger>
                              {{ student.monitorLogs.length }}
                           </template>
                           <div class="flex flex-col">
                              <NText>
                                 Low:
                                 {{ student.warningLevelDistribution.low }}
                              </NText>
                              <NText>
                                 Moderate:
                                 {{ student.warningLevelDistribution.moderate }}
                              </NText>
                              <NText>
                                 Severe:
                                 {{ student.warningLevelDistribution.severe }}
                              </NText>
                           </div>
                        </NTooltip>
                     </Statistic>
                     <Statistic title="Phone Detections">
                        <template #icon>
                           <PhDeviceMobile />
                        </template>
                        {{ student.phoneDetectionsCount }}
                     </Statistic>
                     <Statistic title="Average Integrity Score">
                        <template #icon>
                           <PhChartLine />
                        </template>
                        {{
                           (
                              student.monitorLogsReports.integrityScoreAverage *
                              100
                           ).toFixed(2)
                        }}%
                     </Statistic>
                     <Statistic title="Integrity Score Standard Deviation">
                        {{
                           (
                              student.monitorLogsReports.standardDeviation * 100
                           ).toFixed(2)
                        }}%
                     </Statistic>
                     <Statistic title="Log Count Z-Score">
                        {{ student.zScoreReports.zScore.toFixed(2) }}
                     </Statistic>
                     <Statistic title="Expected Log Count Ratio">
                        {{ student.expectedLogCountRatio.toFixed(2) }}
                     </Statistic>
                  </div>
               </template>
               <template #footer>
                  <div class="flex items-center gap-2">
                     <NText :depth="3" class="text-xs flex items-center gap-1">
                        <PhSignIn />
                        <Timestamp
                           prefix="Joined"
                           :value="student.timeJoined"
                        />
                     </NText>
                     <NText
                        v-if="student.timeLeft"
                        :depth="3"
                        class="text-xs flex items-center gap-1"
                     >
                        <PhSignOut />
                        <Timestamp prefix="Left" :value="student.timeLeft" />
                     </NText>
                  </div>
               </template>
               <template
                  v-if="!student.permitted && room.status !== 'concluded'"
                  #action
               >
                  <div class="flex items-center gap-2">
                     <NButton
                        size="small"
                        type="success"
                        quaternary
                        @click="togglePermit(student, true)"
                     >
                        Approve
                     </NButton>
                     <!-- <NButton
                     size="small"
                     type="error"
                     quaternary
                     @click="togglePermit(student, false)"
                  >
                     Reject
                  </NButton> -->
                  </div>
               </template>
            </RowCard>
         </template>
      </DataView>
   </div>
</template>
<script setup lang="ts">
import { NTooltip, NText, NButton, useMessage, NAlert } from "naive-ui";
import { computed } from "vue";
import DataView from "@/app/components/data-view.vue";
import { useStore } from "@/app/composables/use-store";
import { MonitorLog, RoomInfo, StudentInfo } from "@/lib/typings";
import {
   computeExpectedMonitorLogCount,
   createMonitorLogsReports,
   getAndExplainZScores,
} from "@/lib/reports";
import RowCard from "./row-card.vue";
import Statistic from "./statistic.vue";
import { useFetch } from "../composables/use-fetch";
import {
   PhWarning,
   PhDeviceMobile,
   PhChartLine,
   PhUser,
   PhSignIn,
   PhSignOut,
} from "@phosphor-icons/vue";
import moment from "moment";
import Timestamp from "./timestamp.vue";

const props = defineProps<{
   students: StudentInfo[];
   room: RoomInfo;
   loading?: boolean;
   static?: boolean;
}>();

const store = useStore();
const message = useMessage();
const patchDenyPermitStudent = useFetch(
   "/api/students/:studentId/deny_permit",
   "PATCH",
);
const patchGrantPermitStudent = useFetch(
   "/api/students/:studentId/grant_permit",
   "PATCH",
);

const students = computed(() => {
   const zScoreReports = getAndExplainZScores(props.students);
   const timeStarted = props.room?.timeStarted;
   const timeEnded = props.room?.timeEnded;
   const expectedLogCount =
      timeStarted && timeEnded
         ? computeExpectedMonitorLogCount(timeStarted, timeEnded)
         : 0;
   return props.students.map((student) => {
      const monitorLogs = Array.from(
         store.monitorLogsGroupedByStudentId.get(student.id)?.values() ?? [],
      );
      const warningLevelDistribution = monitorLogs.reduce(
         (acc, log) => {
            const level = log.warningLevel;
            acc[level] = (acc[level] ?? 0) + 1;
            return acc;
         },
         { low: 0, moderate: 0, severe: 0 } as Record<
            MonitorLog["warningLevel"],
            number
         >,
      );

      return {
         ...student,
         monitorLogs,
         monitorLogsReports: createMonitorLogsReports(monitorLogs),
         zScoreReports: zScoreReports.get(student.id)!,
         expectedLogCountRatio:
            expectedLogCount === 0
               ? 1
               : student.monitorLogCount / expectedLogCount,
         phoneDetectionsCount: store.countPhoneDetectionsOfStudent(student.id),
         warningLevelDistribution,
      };
   });
});

const unpermittedStudentsCount = computed(() => {
   return props.students.filter((student) => !student.permitted).length;
});

async function togglePermit(student: StudentInfo, permit: boolean) {
   try {
      if (permit) {
         await patchGrantPermitStudent.execute({
            params: { studentId: student.id },
         });
         message.create(`Permitted ${student.name} to join the room`);
      } else {
         await patchDenyPermitStudent.execute({
            params: { studentId: student.id },
         });
         message.create(`Denied ${student.name} from joining the room`);
      }
   } catch (error) {
      console.error("Failed to toggle permit for student", error);
      message.error("Failed to update student's permit");
   }
}

// const numberOfJoinRequests = computed(() => {
//    return props.students.filter((student) => !student.permitted).length;
// });
</script>
