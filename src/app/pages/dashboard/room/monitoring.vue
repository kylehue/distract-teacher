<template>
   <template v-if="!room">Nothing</template>
   <div v-else class="flex flex-col w-full h-full gap-4">
      <div class="flex items-center justify-end gap-2">
         <NButtonGroup class="me-auto">
            <NButton
               :focusable="false"
               :type="activeTab === 'warningLogs' ? 'primary' : 'default'"
               :secondary="activeTab === 'warningLogs'"
               @click="activeTab = 'warningLogs'"
               size="small"
            >
               Warning Logs
            </NButton>
            <NButton
               :focusable="false"
               :type="activeTab === 'lockedStudents' ? 'primary' : 'default'"
               :secondary="activeTab === 'lockedStudents'"
               @click="activeTab = 'lockedStudents'"
               size="small"
            >
               <NBadge :value="lockedStudents.length" :offset="[10, -8]">
                  Locked Students
               </NBadge>
            </NButton>
         </NButtonGroup>
      </div>
      <DataView
         v-if="activeTab === 'warningLogs'"
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
                  compare: (a, b) =>
                     compareTimestamps(a.createdAt, b.createdAt),
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
                  label: 'Phone Present',
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
               :title="monitorLog.studentName"
               :tags="[
                  {
                     label: 'Phone Detected',
                     type: 'error',
                     visible: monitorLog.isPhonePresent,
                  },
                  {
                     label: toTitleCase(monitorLog.warningLevel),
                     type: warningLevelToComponentType(monitorLog.warningLevel),
                  },
               ]"
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
                           filter: (log) =>
                              log.studentId === monitorLog.studentId,
                        });
                     },
                  },
               ]"
               bordered
            >
               <template #title>
                  <div class="flex gap-x-12 gap-y-4">
                     <Statistic title="Student Name">
                        <template #icon>
                           <PhUser />
                        </template>
                        {{ monitorLog.studentName }}
                     </Statistic>
                     <Statistic title="Integrity Score">
                        <template #icon>
                           <PhChartLine />
                        </template>
                        {{ (monitorLog.integrityScore * 100).toFixed(2) + "%" }}
                     </Statistic>
                  </div>
               </template>
               <template #footer>
                  <NText :depth="3" class="text-xs">
                     {{ timestampToDateString(monitorLog.createdAt) }} at
                     {{
                        timestampToTimeString(monitorLog.createdAt, false, true)
                     }}
                  </NText>
               </template>
            </RowCard>
         </template>
      </DataView>
      <DataView
         v-if="activeTab === 'lockedStudents'"
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
                     compareTimestamps(
                        a.lockMonitorLog.createdAt,
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
            <RowCard
               :tags="[
                  {
                     label: 'Phone Detected',
                     type: 'error',
                     visible: student.lockMonitorLog.isPhonePresent,
                  },
                  {
                     label: toTitleCase(student.lockMonitorLog.warningLevel),
                     type: warningLevelToComponentType(
                        student.lockMonitorLog.warningLevel,
                     ),
                  },
               ]"
               bordered
            >
               <template #title>
                  <div class="flex gap-x-12 gap-y-4">
                     <Statistic title="Student Name">
                        <template #icon>
                           <PhUser />
                        </template>
                        {{ student.name }}
                     </Statistic>
                     <Statistic title="Integrity Score">
                        <template #icon>
                           <PhChartLine />
                        </template>
                        {{
                           (
                              student.lockMonitorLog.integrityScore * 100
                           ).toFixed(2) + "%"
                        }}
                     </Statistic>
                  </div>
               </template>
               <template #footer>
                  <NText :depth="3" class="text-xs">
                     {{
                        timestampToDateString(student.lockMonitorLog.createdAt)
                     }}
                     at
                     {{
                        timestampToTimeString(
                           student.lockMonitorLog.createdAt,
                           false,
                           true,
                        )
                     }}
                  </NText>
               </template>
               <template #action>
                  <div class="flex items-center gap-2">
                     <RouterLink
                        :to="{
                           query: { monitorLogId: student.lockMonitorLog.id },
                        }"
                     >
                        <NButton size="small" secondary>View Evidence</NButton>
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
            </RowCard>
         </template>
      </DataView>
   </div>
</template>

<script setup lang="ts">
import {
   NButton,
   NText,
   useMessage,
   NButtonGroup,
   useThemeVars,
   NBadge,
   NEmpty,
} from "naive-ui";
import { computed, inject, onMounted, ref, useTemplateRef, watch } from "vue";
import { StudentInfo } from "@/lib/typings";
import { PhChartLine, PhUser } from "@phosphor-icons/vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { warningLevelToComponentType } from "@/lib/ui";
import { useFetch } from "@/app/composables/use-fetch";
import {
   compareTimestamps,
   timestampToTimeString,
   timestampToDateString,
} from "@/lib/datetime";
import {
   MONITOR_LOGS_INJECTION_KEY,
   MONITOR_LOGS_MAP_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_MAP_INJECTION_KEY,
   IS_LOADING_INJECTION_KEY,
} from "@/lib/injection-keys";
import DataView from "@/app/components/data-view.vue";
import RowCard from "@/app/components/row-card.vue";
import { toTitleCase } from "@/lib/string";
import Statistic from "@/app/components/statistic.vue";

const TABS = ["warningLogs", "lockedStudents"] as const;

const route = useRoute();
const router = useRouter();
const message = useMessage();
const patchUnlockStudent = useFetch("/api/students/:studentId/unlock", "PATCH");
const room = inject(ROOM_INJECTION_KEY)!;
const students = inject(STUDENTS_MAP_INJECTION_KEY)!;
const monitorLogsArray = inject(MONITOR_LOGS_INJECTION_KEY)!;
const monitorLogs = inject(MONITOR_LOGS_MAP_INJECTION_KEY)!;
const isLoading = inject(IS_LOADING_INJECTION_KEY)!;
const activeTab = ref<(typeof TABS)[number]>("warningLogs");
const warningLogView = useTemplateRef("warningLogView");

const monitorLogsArrayPreprocessed = computed(() => {
   return monitorLogsArray.value.map((m) => ({
      ...m,
      studentName: students.value.get(m.studentId)?.name || "<Unnamed>",
   }));
});
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

watch(
   () => route.query.tab,
   (newTab: any) => {
      if (TABS.includes(newTab)) {
         activeTab.value = newTab;
      }
   },
   { immediate: true },
);

watch(activeTab, (newTab) => {
   if (route.query.tab !== newTab) {
      const query = { ...route.query, tab: newTab };
      router.replace({ query });
   }
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
