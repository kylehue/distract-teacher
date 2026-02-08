<template>
   <div class="overflow-hidden">
      <NDataTable
         ref="table"
         :columns="allColumns"
         :data="students"
         :pagination="static ? false : { pageSize: 10 }"
         :single-line="false"
         :scroll-x="students.length ? 900 : undefined"
         :loading="loading"
      >
         <template #empty>
            <NEmpty
               class="m-auto"
               description="There are currently no students."
            />
         </template>
         <template #loading>
            <Loader text="" />
         </template>
      </NDataTable>
   </div>
</template>

<script setup lang="ts">
import {
   DataTableColumns,
   NBadge,
   NButton,
   NDataTable,
   NPopselect,
   NTag,
   NText,
   NEmpty,
   useMessage,
   useThemeVars,
} from "naive-ui";
import { computed, h, ref, useTemplateRef, VNode, watch } from "vue";
import { StudentInfo, RoomInfo } from "@/lib/typings";
import { RouterLink } from "vue-router";
import { useStore } from "@/app/composables/use-store";
import { renderIcon } from "@/lib/ui";
import { PhDotsThreeVertical, PhFunnelSimple } from "@phosphor-icons/vue";
import { compareTimestamps, timestampToTimeString } from "@/lib/datetime";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { useFetch } from "@/app/composables/use-fetch";
import {
   computeExpectedMonitorLogCount,
   computeStdDev,
   createStudentsIndividualReports,
} from "@/lib/reports";
import Loader from "@/app/components/loader.vue";
import { toTitleCase } from "@/lib/string";

const studentTableColumns = [
   "studentName",
   "warningDistribution",
   "phoneDetections",
   "averageIntegrityScore",
   "standardDeviation",
   "logCountZScore",
   "expectedLogCountRatio",
   "timeJoined",
   "timeLeft",
   "actions",
] as const;
const studentTableActions = [
   "approve",
   "reject",
   "kick",
   "view-logs",
   "view-reports",
] as const;
const props = defineProps<{
   static?: boolean;
   summary?: boolean;
   loading?: boolean;
   columns: (typeof studentTableColumns)[number][];
   actions: (typeof studentTableActions)[number][];
   students: StudentInfo[];
   room: RoomInfo;
}>();

const columnsToShow = ref([] as typeof props.columns);
const table = useTemplateRef("table");
const store = useStore();
const theme = useThemeVars();
const patchDenyPermitStudent = useFetch(
   "/api/students/:studentId/deny_permit",
   "PATCH",
);
const patchGrantPermitStudent = useFetch(
   "/api/students/:studentId/grant_permit",
   "PATCH",
);
const message = useMessage();

const nonReactiveColumns: DataTableColumns<StudentInfo> = [];
if (props.columns.includes("studentName")) {
   nonReactiveColumns.push({
      title: "Student Name",
      key: "studentName",
      ellipsis: props.static ? undefined : { tooltip: { placement: "bottom" } },
      render(row) {
         return h("div", { class: "flex flex-wrap items-center gap-1" }, [
            h(NText, null, { default: () => row.name }),
            !row.active && !props.summary
               ? h(
                    NTag,
                    { type: "default", round: true, size: "small" },
                    { default: () => "Inactive" },
                 )
               : "",
            !row.permitted && !props.summary
               ? h(
                    NTag,
                    { type: "warning", round: true, size: "small" },
                    { default: () => "Needs Approval" },
                 )
               : "",
         ]);
      },
      sorter: {
         compare(rowA, rowB) {
            return (
               Number(rowA.permitted) - Number(rowB.permitted) ||
               Number(rowB.active) - Number(rowA.active) ||
               rowA.name.localeCompare(rowB.name)
            );
         },
         multiple: 1,
      },
      defaultSortOrder: "ascend",
      filterMultiple: true,
      filter(value, row) {
         return value === row.id;
      },
   });
}

if (!props.static && props.columns.includes("actions")) {
   nonReactiveColumns.push({
      title: () => {
         return h(
            NPopselect,
            {
               options: studentTableColumns.filter(
                  (col) => col !== "actions" && col !== "studentName",
               ).map((col) => ({
                  label: col
                     .split(/(?=[A-Z])/)
                     .map(toTitleCase)
                     .join(" "),
                  value: col,
               })),
               value: columnsToShow.value,
               multiple: true,
               trigger: "click",
               async onUpdateValue(v) {
                  columnsToShow.value = v as any;
               },
            },
            {
               default: () =>
                  h(
                     NButton,
                     { size: "small", circle: true, quaternary: true },
                     { default: renderIcon(PhFunnelSimple) },
                  ),
            },
         );
      },
      key: "actions",
      width: 50,
      align: "center",
      fixed: "right",
      render(row) {
         let options: SelectMixedOption[] = [
            {
               value: "approve",
               label: "Approve",
               style: { color: theme.value.successColor },
               disabled:
                  row.permitted ||
                  !props.actions.includes("approve") ||
                  props.room.status === "concluded",
            },
            {
               value: "reject",
               label: "Reject",
               style: { color: theme.value.errorColor },
               disabled:
                  row.permitted ||
                  !row.active ||
                  !props.actions.includes("reject") ||
                  props.room.status === "concluded",
            },
            {
               value: "reports",
               label: "View Reports",
               render({ node }: any) {
                  return h(
                     RouterLink,
                     { to: `/dashboard/student-reports/${row.id}` },
                     () => node,
                  );
               },
               disabled: !props.actions.includes("view-reports"),
            },
            {
               value: "view-logs",
               label: "View Logs",
               render({ node }: any) {
                  return h(
                     RouterLink,
                     {
                        to: {
                           path: "monitoring",
                           query: { filterByStudent: row.id },
                        },
                     },
                     () => node,
                  );
               },
               disabled: !props.actions.includes("view-logs"),
            },
            {
               value: "kick",
               label: "Kick",
               style: { color: theme.value.errorColor },
               disabled:
                  !row.permitted ||
                  !props.actions.includes("kick") ||
                  props.room.status === "concluded",
            },
         ];

         // hide disabled options
         options = options.filter((option) => !option.disabled);

         return h(
            NPopselect,
            {
               options: options,
               trigger: "click",
               async onUpdateValue(v) {
                  if (v == "reject" || v === "kick") {
                     try {
                        await patchDenyPermitStudent.execute({
                           params: { studentId: row.id },
                        });
                     } catch {
                        message.error(
                           patchDenyPermitStudent.error?.message ||
                              "Failed to update student. Please try again.",
                        );
                     }
                  } else if (v === "approve") {
                     try {
                        await patchGrantPermitStudent.execute({
                           params: { studentId: row.id },
                        });
                     } catch {
                        message.error(
                           patchGrantPermitStudent.error?.message ||
                              "Failed to update student. Please try again.",
                        );
                     }
                  }
               },
            },
            {
               default: () =>
                  h(
                     NBadge,
                     { dot: true, show: !row.permitted },
                     {
                        default: () =>
                           h(
                              NButton,
                              {
                                 size: "small",
                                 circle: true,
                                 quaternary: true,
                              },
                              { default: renderIcon(PhDotsThreeVertical) },
                           ),
                     },
                  ),
            },
         );
      },
   });
}

const reactiveColumns = computed(() => {
   const columns: DataTableColumns<StudentInfo> = [];

   if (columnsToShow.value.includes("warningDistribution")) {
      columns.push({
         title: "Warning Distribution",
         key: "warningDistribution",
         sorter: {
            compare(rowA, rowB) {
               return (
                  Number(rowA.permitted) - Number(rowB.permitted) ||
                  Number(rowB.active) - Number(rowA.active) ||
                  store.countMonitorLogsOfStudent(rowA.id) -
                     store.countMonitorLogsOfStudent(rowB.id)
               );
            },
            multiple: 2,
         },
         render(row) {
            let children: VNode[] = [];
            let logs = store.monitorLogsGroupedByStudentId.get(row.id) || [];
            let low = 0;
            let moderate = 0;
            let severe = 0;
            for (let [_, log] of logs) {
               if (log.warningLevel === "low") low++;
               else if (log.warningLevel === "moderate") moderate++;
               else if (log.warningLevel === "severe") severe++;
            }
            if (low) {
               children.push(
                  h(
                     NTag,
                     {
                        type: "success",
                        round: true,
                        size: "small",
                     },
                     {
                        default: () => `Low – ${low}`,
                     },
                  ),
               );
            }
            if (moderate) {
               children.push(
                  h(
                     NTag,
                     {
                        type: "warning",
                        round: true,
                        size: "small",
                     },
                     {
                        default: () => `Moderate – ${moderate}`,
                     },
                  ),
               );
            }
            if (severe) {
               children.push(
                  h(
                     NTag,
                     {
                        type: "error",
                        round: true,
                        size: "small",
                     },
                     {
                        default: () => `Severe – ${severe}`,
                     },
                  ),
               );
            }
            children.push(
               h(
                  NTag,
                  {
                     type: "default",
                     round: true,
                     size: "small",
                  },
                  {
                     default: () => `Total – ${low + moderate + severe}`,
                  },
               ),
            );

            return h("div", { class: "flex flex-col items-start gap-1" }, children);
         },
      });
   }

   if (columnsToShow.value.includes("phoneDetections")) {
      columns.push({
         title: "Phone Activity Count",
         key: "phoneDetections",
         render(row) {
            let monitorLogs = store.monitorLogsGroupedByStudentId.get(row.id);
            if (!monitorLogs) return 0;
            return Array.from(monitorLogs.values()).filter(
               (log) => log.isPhonePresent,
            ).length;
         },
         sorter: {
            compare(rowA, rowB) {
               return (
                  Number(rowA.permitted) - Number(rowB.permitted) ||
                  Number(rowB.active) - Number(rowA.active) ||
                  (() => {
                     let logsA = store.monitorLogsGroupedByStudentId.get(
                        rowA.id,
                     );
                     let logsB = store.monitorLogsGroupedByStudentId.get(
                        rowB.id,
                     );
                     let countA = logsA
                        ? Array.from(logsA.values()).filter(
                             (log) => log.isPhonePresent,
                          ).length
                        : 0;
                     let countB = logsB
                        ? Array.from(logsB.values()).filter(
                             (log) => log.isPhonePresent,
                          ).length
                        : 0;
                     return countA - countB;
                  })()
               );
            },
            multiple: 2,
         },
      });
   }

   if (columnsToShow.value.includes("averageIntegrityScore")) {
      const studentsIntegrityScoreAvgMap = computed(() => {
         const map = new Map<string, number>();
         for (const student of props.students) {
            let monitorLogs = store.monitorLogsGroupedByStudentId.get(
               student.id,
            );
            if (!monitorLogs || monitorLogs.size === 0) {
               map.set(student.id, 0);
            } else {
               let sum = 0;
               for (const [_, log] of monitorLogs) {
                  sum += log.integrityScore;
               }
               map.set(student.id, sum / monitorLogs.size);
            }
         }
         return map;
      });
      columns.push({
         title: "Average Integrity Score",
         key: "averageIntegrityScore",
         sorter: {
            compare(rowA, rowB) {
               return (
                  studentsIntegrityScoreAvgMap.value.get(rowA.id)! -
                  studentsIntegrityScoreAvgMap.value.get(rowB.id)!
               );
            },
            multiple: 2,
         },
         render(row) {
            return (
               (studentsIntegrityScoreAvgMap.value.get(row.id)! * 100).toFixed(
                  2,
               ) + "%"
            );
         },
      });
   }

   if (columnsToShow.value.includes("standardDeviation")) {
      const studentsStdDevMap = computed(() => {
         const map = new Map<string, number>();
         for (const student of props.students) {
            let monitorLogs = store.monitorLogsGroupedByStudentId.get(
               student.id,
            );
            if (!monitorLogs || monitorLogs.size === 0) {
               map.set(student.id, 0);
            } else {
               map.set(
                  student.id,
                  computeStdDev(
                     Array.from(monitorLogs.values()).map(
                        (log) => log.integrityScore,
                     ),
                  ),
               );
            }
         }
         return map;
      });
      columns.push({
         title: "Standard Deviation",
         key: "standardDeviation",
         sorter: {
            compare(rowA, rowB) {
               return (
                  studentsStdDevMap.value.get(rowA.id)! -
                  studentsStdDevMap.value.get(rowB.id)!
               );
            },
            multiple: 2,
         },
         render(row) {
            return (
               (studentsStdDevMap.value.get(row.id)! * 100).toFixed(2) + "%"
            );
         },
      });
   }

   if (columnsToShow.value.includes("logCountZScore")) {
      const zScores = createStudentsIndividualReports(props.students);
      columns.push({
         title: "Log Count Z-Score",
         key: "logCountZScore",
         sorter: {
            compare(rowA, rowB) {
               return (
                  zScores.get(rowA.id)?.zScore! - zScores.get(rowB.id)?.zScore!
               );
            },
            multiple: 2,
         },
         render(row) {
            const zScore = zScores.get(row.id)?.zScore!;
            return zScore.toFixed(2);
         },
      });
   }

   if (columnsToShow.value.includes("expectedLogCountRatio")) {
      const expectedLogCount =
         props.room.timeStarted && props.room.timeEnded
            ? computeExpectedMonitorLogCount(
                 props.room.timeStarted,
                 props.room.timeEnded,
              )
            : null;

      columns.push({
         title: "Log Count / Expected Log Count Ratio",
         key: "expectedLogCountRatio",
         sorter: {
            compare(rowA, rowB) {
               const countA = rowA.monitorLogCount;
               const countB = rowB.monitorLogCount;
               if (!expectedLogCount) return 0;
               return countA / expectedLogCount - countB / expectedLogCount;
            },
            multiple: 2,
         },
         render(row) {
            const count = row.monitorLogCount;
            if (expectedLogCount === null) return "N/A";
            return (count / expectedLogCount).toFixed(2);
         },
      });
   }

   if (columnsToShow.value.includes("timeJoined")) {
      columns.push({
         title: "Time Joined",
         key: "timeJoined",
         render(row) {
            return timestampToTimeString(row.timeJoined);
         },
         sorter: {
            compare(rowA, rowB) {
               return (
                  Number(rowA.permitted) - Number(rowB.permitted) ||
                  Number(rowB.active) - Number(rowA.active) ||
                  compareTimestamps(rowA.timeJoined, rowB.timeJoined)
               );
            },
            multiple: 3,
         },
      });
   }

   if (columnsToShow.value.includes("timeLeft")) {
      columns.push({
         title: "Time Left",
         key: "timeLeft",
         render(row) {
            if (!row.timeLeft) return "N/A";
            return timestampToTimeString(row.timeLeft);
         },
         sorter: {
            compare(rowA, rowB) {
               return (
                  Number(rowA.permitted) - Number(rowB.permitted) ||
                  Number(rowB.active) - Number(rowA.active) ||
                  compareTimestamps(rowA.timeLeft, rowB.timeLeft)
               );
            },
            multiple: 3,
         },
      });
   }

   return columns;
});

const allColumns = computed(() => {
   return [...nonReactiveColumns, ...reactiveColumns.value].sort((a, b) => {
      const indexA = studentTableColumns.indexOf((a as any).key);
      const indexB = studentTableColumns.indexOf((b as any).key);
      return indexA - indexB;
   });
});

watch(
   () => props.columns,
   (c) => (columnsToShow.value = c),
   { immediate: true },
);

defineExpose({
   table,
});
</script>
