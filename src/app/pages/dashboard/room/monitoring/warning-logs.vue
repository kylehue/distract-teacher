<template>
   <div v-if="!room">Nothing</div>
   <DataView
      v-else
      ref="warningLogView"
      :items="monitorLogsArrayPreprocessed"
      :loading="isLoading"
      :search="{
         fields: ['studentName'],
         idField: 'id',
         labelField: 'studentName',
         filterFields: ['studentId'],
      }"
      :sort="{
         options: [
            {
               key: 'createdAt',
               label: 'Timestamp',
               compare: (a, b) => moment(a.createdAt).diff(b.createdAt),
               priority: 5,
            },
            {
               key: 'warningLevel',
               label: 'Warning Level',
               compare: (a, b) => {
                  const levels = { none: 0, low: 1, moderate: 2, severe: 3 };
                  return levels[a.warningLevel] - levels[b.warningLevel];
               },
               priority: 4,
            },
            {
               key: 'integrityScore',
               label: 'Integrity Score',
               compare: (a, b) => a.integrityScore - b.integrityScore,
               priority: 3,
            },
            {
               key: 'studentName',
               label: 'Student Name',
               compare: (a, b) => a.studentName.localeCompare(b.studentName),
               priority: 2,
            },
         ],
         defaultRules: [{ key: 'createdAt', direction: 'desc' }],
      }"
      :column-filter="{
         columns: [
            {
               key: 'warningLevel',
               label: 'Warning Level',
               options: [
                  { label: 'Low', value: 'low' },
                  { label: 'Moderate', value: 'moderate' },
                  { label: 'Severe', value: 'severe' },
               ],
            },
            {
               key: 'isPhonePresent',
               label: 'Phone Detected',
               options: [
                  { label: 'Yes', value: true },
                  { label: 'No', value: false },
               ],
            },
         ],
      }"
   >
      <template #empty>
         <NEmpty
            class="m-auto"
            description="There are currently no warning logs."
         />
      </template>
      <template #item="{ item: monitorLog }">
         <RowCard
            bordered
            :menu-options="[
               {
                  label: 'View Evidence',
                  to: { query: { monitorLogId: monitorLog.id } },
               },
               {
                  label: 'View Reports',
                  to: `/dashboard/student-reports/${monitorLog.studentId}`,
               },
               {
                  label: 'Filter By This Student',
                  onSelect() {
                     warningLogView?.addSpecialFilter({
                        key: 'filterByStudent',
                        label: `Student: ${monitorLog.studentName}`,
                        filter: (log) => log.studentId === monitorLog.studentId,
                     });
                  },
               },
            ]"
         >
            <template #content>
               <MonitorLogItem
                  :monitorLog="monitorLog"
                  :student="monitorLog.student"
                  :room="room"
               />
            </template>
         </RowCard>
      </template>
   </DataView>
</template>

<script setup lang="ts">
import { NEmpty } from "naive-ui";
import { computed, inject, onMounted, useTemplateRef } from "vue";
import { useRoute } from "vue-router";
import {
   MONITOR_LOGS_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_MAP_INJECTION_KEY,
   IS_LOADING_INJECTION_KEY,
} from "@/lib/injection-keys";
import DataView from "@/app/components/data-view.vue";
import RowCard from "@/app/components/row-card.vue";
import MonitorLogItem from "@/app/components/monitor-log-item.vue";
import moment from "moment";

const route = useRoute();
const room = inject(ROOM_INJECTION_KEY)!;
const students = inject(STUDENTS_MAP_INJECTION_KEY)!;
const monitorLogsArray = inject(MONITOR_LOGS_INJECTION_KEY)!;
const isLoading = inject(IS_LOADING_INJECTION_KEY)!;
const warningLogView = useTemplateRef("warningLogView");

const monitorLogsArrayPreprocessed = computed(() => {
   return monitorLogsArray.value.map((m) => {
      const student = students.value.get(m.studentId)!;
      return {
         ...m,
         studentName: student.name,
         student: student,
      };
   });
});

onMounted(() => {
   if (route.query.filterByStudent) {
      const studentId = route.query.filterByStudent as string;
      warningLogView.value?.addSpecialFilter({
         key: "filterByStudent",
         label: `Student: ${
            students.value.get(studentId)?.name || "<Unknown>"
         }`,
         filter: (log) => log.studentId === studentId,
      });
   }
});
</script>
