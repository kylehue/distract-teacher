<template>
   <template v-if="!room || !teacher">Missing data</template>
   <div v-else class="grid gap-4">
      <NText class="text-xl font-medium mt-4">General Information</NText>
      <div class="flex flex-wrap gap-4">
         <NCard
            title="Room"
            class="lg:flex-1"
            content-class="flex flex-wrap gap-x-16 gap-y-8"
            :bordered="false"
         >
            <NStatistic label="Room Title">
               {{ room.title }}
            </NStatistic>
            <NStatistic label="Room Code">
               {{ room.code }}
            </NStatistic>
            <NStatistic label="Room Capacity">
               {{ room.studentCapacity }}
            </NStatistic>
            <NStatistic label="Teacher Name">
               {{ teacher.displayName }}
            </NStatistic>
            <NStatistic label="Date Created">
               {{ timestampToDateString(room.createdAt) }}
            </NStatistic>
         </NCard>
         <NCard
            title="Session"
            class="lg:flex-1"
            content-class="flex flex-wrap gap-x-16 gap-y-8"
            :bordered="false"
         >
            <NStatistic label="Time Started">
               {{
                  room.timeStarted
                     ? timestampToTimeString(room.timeStarted)
                     : "N/A"
               }}
            </NStatistic>
            <NStatistic label="Time Ended">
               {{
                  room.timeEnded ? timestampToTimeString(room.timeEnded) : "N/A"
               }}
            </NStatistic>
            <NStatistic label="Total Session Duration">
               {{
                  room.timeStarted && room.timeEnded
                     ? totalTime(room.timeStarted, room.timeEnded)
                     : "N/A"
               }}
            </NStatistic>
            <NStatistic label="Room Status">
               <RoomStatusTag :room="room" />
            </NStatistic>
            <NStatistic label="Monitoring Status">
               <RoomStatusTag :room="room" type="monitoring" />
            </NStatistic>
         </NCard>
         <div class="w-full flex flex-wrap gap-4">
            <NCard class="md:flex-1" :bordered="false">
               <NStatistic label="Average Integrity Score">
                  {{ (integrityScoreAvg * 100).toFixed(2) }}%
               </NStatistic>
               <NText :depth="3" class="text-xs">
                  {{ integrityExplanation }}
               </NText>
            </NCard>
            <NCard class="md:flex-1" :bordered="false">
               <NStatistic label="Total Number of Warnings">
                  {{ monitorLogsArrayPreprocessed.length }}
               </NStatistic>
            </NCard>
            <NCard class="md:flex-1" :bordered="false">
               <NStatistic label="Active Students">
                  {{
                     studentsArrayPreprocessed.filter(
                        (student) => student.active,
                     ).length
                  }}
               </NStatistic>
            </NCard>
            <NCard class="md:flex-1" :bordered="false">
               <NStatistic label="Inactive Students">
                  {{
                     studentsArrayPreprocessed.filter(
                        (student) => !student.active,
                     ).length
                  }}
               </NStatistic>
            </NCard>
         </div>
      </div>
      <NText class="text-xl font-medium mt-8">Analytics</NText>
      <div class="grid grid-cols-2 gap-4">
         <NCard title="Warning Level Distribution" :bordered="false">
            <WarningLevelChart
               ref="warningLevelChart"
               :theme="props.theme"
               :static="props.static"
            />
         </NCard>
      </div>
      <NText class="text-xl font-medium mt-8" data-print-new-page>
         Students Summary
      </NText>
      <StudentsTable :static="static" />
   </div>
</template>

<script setup lang="ts">
import { NText, NStatistic, NCard } from "naive-ui";
import { computed, h, inject } from "vue";
import {
   timestampToDateString,
   timestampToTimeString,
   totalTime,
} from "@/lib/datetime";
import { explainIntegrity } from "@/lib/reports";
import RoomStatusTag from "@/app/components/room-status-tag.vue";
import StudentsTable from "./tables/students.vue";
import {
   STUDENTS_INJECTION_KEY,
   MONITOR_LOGS_INJECTION_KEY,
   TEACHER_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_MAP_INJECTION_KEY,
} from "@/lib/injection-keys";
import WarningLevelChart from "./charts/warning-level-chart.vue";

const props = defineProps<{
   theme: "light" | "dark";
   static?: boolean;
}>();

const room = inject(ROOM_INJECTION_KEY)!;
const teacher = inject(TEACHER_INJECTION_KEY)!;
const students = inject(STUDENTS_MAP_INJECTION_KEY)!;
const studentsArray = inject(STUDENTS_INJECTION_KEY)!;
const studentsArrayPreprocessed = computed(() =>
   studentsArray.value.filter((student) => student.permitted),
);
const monitorLogsArray = inject(MONITOR_LOGS_INJECTION_KEY)!;
const monitorLogsArrayPreprocessed = computed(() =>
   monitorLogsArray.value.filter(
      (log) => students.value.get(log.studentId)?.permitted,
   ),
);

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
