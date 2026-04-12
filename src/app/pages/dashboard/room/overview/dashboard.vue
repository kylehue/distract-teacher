<template>
   <template v-if="!room || !teacher">Missing data</template>
   <div v-else class="grid gap-4">
      <NText class="text-xl font-medium mt-4">General Information</NText>
      <div class="flex flex-wrap gap-4 print-entity">
         <NCard
            title="Room"
            class="lg:flex-1"
            content-class="flex flex-wrap gap-x-16 gap-y-8"
         >
            <Statistic title="Room Title">
               {{ room.title }}
            </Statistic>
            <Statistic title="Room Code">
               {{ room.code }}
            </Statistic>
            <Statistic title="Room Capacity">
               {{ room.studentCapacity }}
            </Statistic>
            <Statistic title="Teacher Name">
               {{ teacher.displayName }}
            </Statistic>
            <Statistic title="Date Created">
               <Timestamp
                  :value="room.createdAt"
                  absolute
                  date-only
                  simple-date
               />
            </Statistic>
         </NCard>
         <NCard
            title="Session"
            class="lg:flex-1"
            content-class="flex flex-wrap gap-x-16 gap-y-8"
         >
            <Statistic title="Time Started" value="N/A">
               <Timestamp
                  v-if="room.timeStarted"
                  :value="room.timeStarted"
                  absolute
                  time-only
                  exclude-seconds
               />
            </Statistic>
            <Statistic v-if="room.timeEnded" title="Time Ended">
               <Timestamp
                  :value="room.timeEnded"
                  absolute
                  time-only
                  exclude-seconds
               />
            </Statistic>
            <Statistic
               v-if="room.timeStarted && room.timeEnded"
               title="Total Session Duration"
            >
               {{ totalTime(room.timeStarted, room.timeEnded) }}
            </Statistic>
            <Statistic title="Monitoring Status">
               <RoomStatusTag :room="room" />
            </Statistic>
         </NCard>
         <div class="w-full flex flex-wrap gap-4 min-h-40">
            <NCard class="md:flex-1">
               <Statistic title="Active Students" size="large" exclusive>
                  <template #title-suffix>
                     <InfoTooltip>
                        The number of students currently active in the session.
                     </InfoTooltip>
                  </template>
                  {{
                     studentsArrayPreprocessed.filter(
                        (student) => student.active,
                     ).length
                  }}
               </Statistic>
            </NCard>
            <NCard class="md:flex-1">
               <Statistic title="Inactive Students" size="large" exclusive>
                  <template #title-suffix>
                     <InfoTooltip>
                        The number of students that have left the session or
                        were removed. This doesn't include the students that
                        have no monitor log data.
                     </InfoTooltip>
                  </template>
                  {{
                     studentsArrayPreprocessed.filter(
                        (student) => !student.active,
                     ).length
                  }}
               </Statistic>
            </NCard>
         </div>
      </div>
      <div class="flex flex-col gap-4 print-entity mt-8">
         <NText class="text-xl font-medium">Analytics</NText>
         <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <NCard class="md:flex-1 min-h-40">
               <Statistic
                  title="Total Number of Warnings"
                  size="large"
                  exclusive
               >
                  <template #title-suffix>
                     <InfoTooltip>
                        The total number of warnings received across all
                        students in this room.
                     </InfoTooltip>
                  </template>
                  {{ monitorLogsArrayPreprocessed.length }}
               </Statistic>
            </NCard>
            <NCard>
               <NText :depth="3">
                  Warning Level Distribution Across All Students
               </NText>
               <WarningLevelChart
                  ref="warningLevelChart"
                  :theme="props.theme"
                  :static="props.static"
               />
            </NCard>
         </div>
      </div>
      <div class="flex flex-col gap-4 print-entity mt-8">
         <NText class="text-xl font-medium">Leaderboard</NText>
         <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <NCard class="md:flex-1" content-class="flex flex-col gap-4">
               <NText :depth="3"> Top Suspicious Students </NText>
               <NDataTable
                  :columns="top5CheatingStudentsData"
                  :data="top5CheatingStudents"
               />
            </NCard>
            <NCard class="md:flex-1" content-class="flex flex-col gap-4">
               <NText :depth="3"> Top Normal Students </NText>
               <NDataTable
                  :columns="top5NormalStudentsData"
                  :data="top5NormalStudents"
               />
            </NCard>
         </div>
      </div>
      <div class="flex flex-col gap-4 mt-8">
         <NText class="text-xl font-medium print-entity">
            Students Summary
         </NText>
         <StudentsView
            :students="studentsArrayPreprocessed"
            :room="room"
            :loading="isLoading"
            :static="static"
         />
      </div>
   </div>
</template>

<script setup lang="ts">
import { NText, NCard, NDataTable, NAvatar, DataTableColumns } from "naive-ui";
import { computed, h, inject, reactive } from "vue";
import { totalTime } from "@/lib/datetime";
import { explainIntegrity } from "@/lib/reports";
import RoomStatusTag from "@/app/components/room-status-tag.vue";
import {
   STUDENTS_INJECTION_KEY,
   MONITOR_LOGS_INJECTION_KEY,
   TEACHER_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_MAP_INJECTION_KEY,
   IS_LOADING_INJECTION_KEY,
} from "@/lib/injection-keys";
import WarningLevelChart from "./charts/warning-level-chart.vue";
import InfoTooltip from "@/app/components/info-tooltip.vue";
import StudentsView from "@/app/components/students-view.vue";
import Statistic from "@/app/components/statistic.vue";
import Timestamp from "@/app/components/timestamp.vue";
import { RowData } from "naive-ui/es/data-table/src/interface";
import { StudentInfo } from "@/lib/typings";
import { title } from "process";
import { RouterLink } from "vue-router";

const props = defineProps<{
   theme: "light" | "dark";
   static?: boolean;
}>();

const room = inject(ROOM_INJECTION_KEY)!;
const teacher = inject(TEACHER_INJECTION_KEY)!;
const students = inject(STUDENTS_MAP_INJECTION_KEY)!;
const studentsArray = inject(STUDENTS_INJECTION_KEY)!;
const isLoading = inject(IS_LOADING_INJECTION_KEY)!;
const studentsArrayPreprocessed = computed(() =>
   studentsArray.value.filter((student) => student.permitted),
);
const monitorLogsArray = inject(MONITOR_LOGS_INJECTION_KEY)!;
const monitorLogsArrayPreprocessed = computed(() =>
   monitorLogsArray.value.filter(
      (log) => students.value.get(log.studentId)?.permitted,
   ),
);
const studentAverageIntegrityScoreMap = computed(() => {
   const map = new Map<string, number>();
   const lengths = new Map<string, number>();
   monitorLogsArrayPreprocessed.value.forEach((log) => {
      const studentId = log.studentId;
      const integrityScore = log.integrityScore;
      if (!map.has(studentId)) {
         map.set(studentId, integrityScore);
         lengths.set(studentId, 1);
      } else {
         map.set(studentId, map.get(studentId)! + integrityScore);
         lengths.set(studentId, lengths.get(studentId)! + 1);
      }
   });
   for (const [studentId, totalScore] of map.entries()) {
      map.set(studentId, totalScore / lengths.get(studentId)!);
   }
   return map;
});
const studentsSortedByIntegrityScore = computed(() => {
   const copy = studentsArrayPreprocessed.value.slice();
   copy.sort((a, b) => {
      const aScore = studentAverageIntegrityScoreMap.value.get(a.id) ?? 0;
      const bScore = studentAverageIntegrityScoreMap.value.get(b.id) ?? 0;
      return aScore - bScore;
   });
   return copy;
});
const top5CheatingStudents = computed(() => {
   return studentsSortedByIntegrityScore.value.slice(0, 5);
});
const top5CheatingStudentsData: DataTableColumns<StudentInfo> = reactive([
   {
      title: "Rank",
      key: "rank",
      width: 70,
      align: "center",
      render: (row, index) => index + 1,
   },
   {
      title: "Student",
      key: "name",
      render: (row) => {
         return h("div", { class: "flex gap-2 items-center" }, [
            h(NAvatar, {
               src: row.avatarUrl,
               circle: true,
               objectFit: "cover",
               size: "large",
            }),
            h(
               RouterLink,
               { to: `/dashboard/student-reports/${row.id}`, class: "link" },
               () => row.name,
            ),
         ]);
      },
   },
   {
      title: "Avg Integrity Score",
      key: "score",
      render: (row) =>
         (
            (studentAverageIntegrityScoreMap.value.get(row.id) ?? 0) * 100
         ).toFixed(2) + "%",
   },
]);
const top5NormalStudents = computed(() => {
   return studentsSortedByIntegrityScore.value.slice(-5).reverse();
});
const top5NormalStudentsData: DataTableColumns<StudentInfo> = reactive([
   {
      title: "Rank",
      key: "rank",
      width: 70,
      align: "center",
      render: (row, index) => index + 1,
   },
   {
      title: "Student",
      key: "name",
      render: (row) => {
         return h("div", { class: "flex gap-2 items-center" }, [
            h(NAvatar, {
               src: row.avatarUrl,
               circle: true,
               objectFit: "cover",
               size: "large",
            }),
            h(
               RouterLink,
               { to: `/dashboard/student-reports/${row.id}`, class: "link" },
               () => row.name,
            ),
         ]);
      },
   },
   {
      title: "Avg Integrity Score",
      key: "score",
      render: (row) =>
         (
            (studentAverageIntegrityScoreMap.value.get(row.id) ?? 0) * 100
         ).toFixed(2) + "%",
   },
]);

// Calculations
const integrityScoreAvg = computed(() => {
   if (monitorLogsArrayPreprocessed.value.length === 0) return 0;
   const sum = monitorLogsArrayPreprocessed.value.reduce(
      (acc, log) => acc + log.integrityScore,
      0,
   );
   return sum / monitorLogsArrayPreprocessed.value.length;
});

const integrityExplanation = computed(() => {
   return explainIntegrity(integrityScoreAvg.value);
});
</script>
