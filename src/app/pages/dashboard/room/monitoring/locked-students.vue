<template>
   <template v-if="!room">Nothing</template>
   <DataView
      v-else
      :items="lockedStudents"
      :loading="isLoading"
      :search="{
         fields: ['name'],
         idField: 'id',
         labelField: 'name',
      }"
      :sort="{
         options: [
            {
               key: 'timeLocked',
               label: 'Time Locked',
               compare: (a, b) =>
                  moment(a.lockMonitorLog.createdAt).diff(
                     b.lockMonitorLog.createdAt,
                  ),
               priority: 5,
            },
            {
               key: 'integrityScore',
               label: 'Integrity Score',
               compare: (a, b) =>
                  a.lockMonitorLog.integrityScore -
                  b.lockMonitorLog.integrityScore,
               priority: 3,
            },
            {
               key: 'name',
               label: 'Student Name',
               compare: (a, b) => a.name.localeCompare(b.name),
               priority: 2,
            },
         ],
         defaultRules: [{ key: 'timeLocked', direction: 'desc' }],
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
               value: (student) => student.lockMonitorLog.warningLevel,
            },
            {
               key: 'isPhonePresent',
               label: 'Phone Present',
               options: [
                  { label: 'Yes', value: true },
                  { label: 'No', value: false },
               ],
               value: (student) => student.lockMonitorLog.isPhonePresent,
            },
         ],
      }"
   >
      <template #empty>
         <NEmpty
            class="m-auto"
            description="There are currently no locked students."
         />
      </template>
      <template #item="{ item: student }">
         <RowCard bordered>
            <template #content>
               <MonitorLogItem
                  :monitorLog="student.lockMonitorLog"
                  :student="student"
                  :room="room"
               >
                  <template #action>
                     <div class="flex items-center gap-2">
                        <RouterLink
                           :to="{
                              query: {
                                 monitorLogId: student.lockMonitorLog.id,
                              },
                           }"
                        >
                           <NButton size="small" secondary>
                              View Evidence
                           </NButton>
                        </RouterLink>
                        <NButton
                           type="error"
                           size="small"
                           secondary
                           :loading="patchUnlockStudent.isLoading"
                           @click="closeCase(student)"
                        >
                           Close Case
                        </NButton>
                     </div>
                  </template>
               </MonitorLogItem>
            </template>
         </RowCard>
      </template>
   </DataView>
</template>

<script setup lang="ts">
import { NButton, useMessage, NEmpty } from "naive-ui";
import { computed, inject } from "vue";
import { StudentInfo } from "@/lib/typings";
import { RouterLink } from "vue-router";
import { useFetch } from "@/app/composables/use-fetch";
import {
   MONITOR_LOGS_MAP_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_MAP_INJECTION_KEY,
   IS_LOADING_INJECTION_KEY,
} from "@/lib/injection-keys";
import DataView from "@/app/components/data-view.vue";
import RowCard from "@/app/components/row-card.vue";
import MonitorLogItem from "@/app/components/monitor-log-item.vue";
import moment from "moment";

const message = useMessage();
const patchUnlockStudent = useFetch("/api/students/:studentId/unlock", "PATCH");
const room = inject(ROOM_INJECTION_KEY)!;
const students = inject(STUDENTS_MAP_INJECTION_KEY)!;
const monitorLogs = inject(MONITOR_LOGS_MAP_INJECTION_KEY)!;
const isLoading = inject(IS_LOADING_INJECTION_KEY)!;
async function closeCase(student: StudentInfo) {
   try {
      await patchUnlockStudent.execute({
         params: { studentId: student.id },
      });
      message.success(`Cheating case for ${student.name} has been closed.`);
   } catch (e) {
      console.error(e);
      message.error("Something went wrong while closing the case.");
   }
}

const lockedStudents = computed(() => {
   return Array.from(students.value.values())
      .filter((s) => s.permitted && !!s.lockMonitorLogId)
      .map((v) => ({
         ...v,
         lockMonitorLog: monitorLogs.value.get(v.lockMonitorLogId!)!,
      }));
});
</script>
