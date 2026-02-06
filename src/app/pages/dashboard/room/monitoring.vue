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
      <div
         v-if="activeTab === 'warningLogs'"
         class="overflow-hidden"
      >
         <NDataTable
            :columns="monitorLogColumns"
            :data="monitorLogsArray"
            :pagination="{ pageSize: 10 }"
            :single-line="false"
            :scroll-x="monitorLogsArray.length ? 900 : undefined"
            :loading="isLoading"
         >
            <template #empty>
               <NEmpty
                  class="m-auto"
                  description="There are currently no warning logs."
               />
            </template>
         </NDataTable>
      </div>
      <div
         v-if="activeTab === 'lockedStudents'"
         class="overflow-hidden"
      >
         <NDataTable
            :columns="lockedStudentColumns"
            :data="lockedStudents"
            :pagination="{ pageSize: 10 }"
            :single-line="false"
            :scroll-x="lockedStudents.length ? 900 : undefined"
            :loading="isLoading"
         >
            <template #empty>
               <NEmpty
                  class="m-auto"
                  description="There are currently no locked students."
               />
            </template>
         </NDataTable>
      </div>
   </div>
</template>

<script setup lang="ts">
import {
   DataTableBaseColumn,
   DataTableColumns,
   NButton,
   NDataTable,
   NTag,
   NText,
   useMessage,
   NPopselect,
   NButtonGroup,
   useThemeVars,
   NBadge,
   NEmpty,
} from "naive-ui";
import { computed, h, inject, onMounted, reactive, Ref, ref, watch } from "vue";
import { MonitorLog, RoomInfo, StudentInfo } from "@/lib/typings";
import {
   PhPause,
   PhPlay,
   PhStop,
   PhDotsThreeVertical,
} from "@phosphor-icons/vue";
import { RouterLink, useRoute } from "vue-router";
import { renderIcon, warningLevelToComponentType } from "@/lib/ui";
import FilterMenuMultiselect from "@/app/components/filter-menu-multiselect.vue";
import { useFetch } from "@/app/composables/use-fetch";
import { compareTimestamps, timestampToTimeString } from "@/lib/datetime";
import {
   MONITOR_LOGS_INJECTION_KEY,
   MONITOR_LOGS_MAP_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_MAP_INJECTION_KEY,
   IS_LOADING_INJECTION_KEY,
} from "@/lib/injection-keys";

const route = useRoute();
const message = useMessage();
const patchUnlockStudent = useFetch("/api/students/:studentId/unlock", "PATCH");
const filteredStudentIds = ref<string[]>([]);
const themeVars = useThemeVars();
const room = inject(ROOM_INJECTION_KEY)!;
const students = inject(STUDENTS_MAP_INJECTION_KEY)!;
const monitorLogsArray = inject(MONITOR_LOGS_INJECTION_KEY)!;
const monitorLogs = inject(MONITOR_LOGS_MAP_INJECTION_KEY)!;
const isLoading = inject(IS_LOADING_INJECTION_KEY)!;
const activeTab = ref<"warningLogs" | "lockedStudents">("warningLogs");
const monitorLogColumns: DataTableColumns<MonitorLog> = [
   reactive({
      title: "Student Name",
      key: "studentName",
      render(row) {
         let student = students.value.get(row.studentId);
         return h("div", { class: "flex flex-wrap items-center gap-1" }, [
            h(NText, null, {
               default: () => student?.name || "<Unnamed>",
            }),
            !student?.active
               ? h(
                    NTag,
                    { type: "default", round: true, size: "small" },
                    { default: () => "Inactive" },
                 )
               : "",
            !student?.permitted
               ? h(
                    NTag,
                    { type: "warning", round: true, size: "small" },
                    { default: () => "Needs Approval" },
                 )
               : "",
         ]);
      },
      filterMultiple: true,
      renderFilterMenu({ hide }) {
         return h(FilterMenuMultiselect, {
            class: "w-[200px]!",
            placeholder: "Filter students",
            placement: "right-start",
            options: Array.from(students.value.values()).map((s) => ({
               label: s.name,
               value: s.id,
            })),
            value: filteredStudentIds.value,
            onConfirm(data) {
               filterByStudentIds(data);
               hide();
            },
            onClear() {
               filterByStudentIds([]);
               hide();
            },
         });
      },
      filter(value, row) {
         return value === row.studentId;
      },
      sorter: {
         compare(rowA, rowB) {
            const studentA = students.value.get(rowA.studentId);
            const studentB = students.value.get(rowB.studentId);
            if (!studentA || !studentB) return 0;
            return studentA.name.localeCompare(studentB.name);
         },
         multiple: 1,
      },
   }),
   {
      title: "Integrity Score",
      key: "integrityScore",
      render(row) {
         return (row.integrityScore * 100).toFixed(2) + "%";
      },
      sorter: {
         compare(rowA, rowB) {
            return rowA.integrityScore - rowB.integrityScore;
         },
         multiple: 3,
      },
   },
   {
      title: "Warning Level",
      key: "warningLevel",
      render(row) {
         return h(
            NTag,
            {
               type: warningLevelToComponentType(row.warningLevel),
               round: true,
            },
            { default: () => row.warningLevel },
         );
      },
      filterOptions: [
         {
            label: "Low",
            value: "low",
         },
         {
            label: "Moderate",
            value: "moderate",
         },
         {
            label: "Severe",
            value: "severe",
         },
      ],
      filterMultiple: true,
      filter(value, row) {
         return row.warningLevel === value;
      },
      sorter: {
         compare(rowA, rowB) {
            const levels = { none: 0, low: 1, moderate: 2, severe: 3 };
            return levels[rowA.warningLevel] - levels[rowB.warningLevel];
         },
         multiple: 3,
      },
   },
   {
      title: "Phone Detected",
      key: "isPhonePresent",
      width: 200,
      render(row) {
         return h(
            NText,
            { type: row.isPhonePresent ? "error" : undefined },
            { default: () => (row.isPhonePresent ? "Yes" : "No") },
         );
      },
      filterOptions: [
         {
            label: "Yes",
            value: "true",
         },
         {
            label: "No",
            value: "false",
         },
      ],
      filterMultiple: true,
      filter(value, row) {
         return String(row.isPhonePresent) === value;
      },
      sorter: {
         compare(rowA, rowB) {
            return Number(rowA.isPhonePresent) - Number(rowB.isPhonePresent);
         },
         multiple: 4,
      },
   },
   {
      title: "Time",
      key: "time",
      render(row) {
         return timestampToTimeString(row.createdAt, false, true);
      },
      sorter: {
         compare(rowA, rowB) {
            return compareTimestamps(rowA.createdAt, rowB.createdAt);
         },
         multiple: 2,
      },
      defaultSortOrder: "descend",
   },
   {
      title: "",
      key: "actions",
      width: 50,
      align: "center",
      fixed: "right",
      render(row) {
         return h(
            NPopselect,
            {
               options: [
                  {
                     value: "evidence",
                     label: "View Evidence",
                     render({ node }: any) {
                        return h(
                           RouterLink,
                           { to: { query: { monitorLogId: row.id } } },
                           () => node,
                        );
                     },
                  },
                  {
                     value: "reports",
                     label: "View Reports",
                     render({ node }: any) {
                        return h(
                           RouterLink,
                           {
                              to: `/dashboard/student-reports/${row.studentId}`,
                           },
                           () => node,
                        );
                     },
                  },
               ],
               trigger: "click",
            },
            {
               default: () =>
                  h(
                     NButton,
                     { size: "small", circle: true, quaternary: true },
                     { default: renderIcon(PhDotsThreeVertical) },
                  ),
            },
         );
      },
   },
];

const lockedStudentColumns: DataTableColumns<StudentInfo> = [
   reactive({
      title: "Student Name",
      key: "studentName",
      render(row) {
         return h("div", { class: "flex flex-wrap items-center gap-1" }, [
            h(NText, null, {
               default: () => row?.name || "<Unnamed>",
            }),
            !row?.active
               ? h(
                    NTag,
                    { type: "default", round: true, size: "small" },
                    { default: () => "Inactive" },
                 )
               : "",
            !row?.permitted
               ? h(
                    NTag,
                    { type: "warning", round: true, size: "small" },
                    { default: () => "Needs Approval" },
                 )
               : "",
         ]);
      },
      filterMultiple: true,
      renderFilterMenu({ hide }) {
         return h(FilterMenuMultiselect, {
            class: "w-[200px]!",
            placeholder: "Filter students",
            placement: "right-start",
            options: Array.from(students.value.values()).map((s) => ({
               label: s.name,
               value: s.id,
            })),
            value: filteredStudentIds.value,
            onConfirm(data) {
               filterByStudentIds(data);
               hide();
            },
            onClear() {
               filterByStudentIds([]);
               hide();
            },
         });
      },
      filter(value, row) {
         return value === row.id;
      },
      sorter: {
         compare(rowA, rowB) {
            return rowA.name.localeCompare(rowB.name);
         },
         multiple: 1,
      },
   }),
   {
      title: "Evidence Integrity Score",
      key: "integrityScore",
      render(row) {
         let monitorLog = monitorLogs.value.get(row.lockMonitorLogId!)!;
         return (monitorLog.integrityScore * 100).toFixed(2) + "%";
      },
      sorter: {
         compare(rowA, rowB) {
            let monitorLogA = monitorLogs.value.get(rowA.lockMonitorLogId!)!;
            let monitorLogB = monitorLogs.value.get(rowB.lockMonitorLogId!)!;
            return monitorLogA.integrityScore - monitorLogB.integrityScore;
         },
         multiple: 3,
      },
   },
   {
      title: "Phone Detected",
      key: "isPhonePresent",
      render(row) {
         let monitorLog = monitorLogs.value.get(row.lockMonitorLogId!)!;
         return h(
            NText,
            { type: monitorLog.isPhonePresent ? "error" : undefined },
            { default: () => (monitorLog.isPhonePresent ? "Yes" : "No") },
         );
      },
      filterOptions: [
         {
            label: "Yes",
            value: "true",
         },
         {
            label: "No",
            value: "false",
         },
      ],
      filterMultiple: true,
      filter(value, row) {
         let monitorLog = monitorLogs.value.get(row.lockMonitorLogId!)!;
         return String(monitorLog.isPhonePresent) === value;
      },
      sorter: {
         compare(rowA, rowB) {
            let monitorLogA = monitorLogs.value.get(rowA.lockMonitorLogId!)!;
            let monitorLogB = monitorLogs.value.get(rowB.lockMonitorLogId!)!;
            return (
               Number(monitorLogA.isPhonePresent) -
               Number(monitorLogB.isPhonePresent)
            );
         },
         multiple: 4,
      },
   },
   {
      title: "Time Locked",
      key: "time",
      render(row) {
         let monitorLog = monitorLogs.value.get(row.lockMonitorLogId!)!;
         return timestampToTimeString(monitorLog.createdAt, false, true);
      },
      sorter: {
         compare(rowA, rowB) {
            let monitorLogA = monitorLogs.value.get(rowA.lockMonitorLogId!)!;
            let monitorLogB = monitorLogs.value.get(rowB.lockMonitorLogId!)!;
            return compareTimestamps(
               monitorLogA.createdAt,
               monitorLogB.createdAt,
            );
         },
         multiple: 2,
      },
      defaultSortOrder: "descend",
   },
   {
      title: "",
      key: "actions",
      width: 50,
      align: "center",
      fixed: "right",
      render(row) {
         let monitorLog = monitorLogs.value.get(row.lockMonitorLogId!)!;
         return h(
            NPopselect,
            {
               options: [
                  {
                     value: "evidence",
                     label: "View Lock Evidence",
                     render({ node }: any) {
                        return h(
                           RouterLink,
                           { to: { query: { monitorLogId: monitorLog.id } } },
                           () => node,
                        );
                     },
                  },
                  {
                     value: "close",
                     label: "Close Case",
                     style: { color: themeVars.value.errorColor },
                  },
               ],
               trigger: "click",
               async onUpdateValue(v) {
                  if (v === "close") {
                     try {
                        await patchUnlockStudent.execute({
                           params: { studentId: row.id },
                        });
                        message.success(
                           `Cheating case for ${row.name} has been closed.`,
                        );
                     } catch (e) {
                        console.error(e);
                        message.error(
                           "Something went wrong while closing the case.",
                        );
                     }
                  }
               },
            },
            {
               default: () =>
                  h(
                     NButton,
                     { size: "small", circle: true, quaternary: true },
                     { default: renderIcon(PhDotsThreeVertical) },
                  ),
            },
         );
      },
   },
];

const lockedStudents = computed(() => {
   return Array.from(students.value.values()).filter(
      (s) => s.permitted && !!s.lockMonitorLogId,
   );
});

function filterByStudentIds(ids: string[]) {
   const studentNameColumn = monitorLogColumns.find(
      (col) => (col as any).key === "studentName",
   ) as DataTableBaseColumn<MonitorLog>;
   filteredStudentIds.value = ids;
   studentNameColumn.filterOptionValues = ids;
}

onMounted(() => {
   if (route.query.filterByStudent) {
      filteredStudentIds.value = [route.query.filterByStudent as string];
      filterByStudentIds(filteredStudentIds.value);
   }
});
</script>
