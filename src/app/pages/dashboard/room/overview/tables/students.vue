<template>
   <NDataTable
      ref="table"
      :columns="columns"
      :data="studentsArray"
      :pagination="static ? false : { pageSize: 10 }"
      :single-line="false"
   />
</template>

<script setup lang="ts">
import { PhDotsThreeVertical } from "@phosphor-icons/vue";
import {
   NButton,
   NText,
   NDataTable,
   DataTableColumns,
   NPopselect,
   NTag,
   useThemeVars,
   NCard,
} from "naive-ui";
import { computed, h, inject } from "vue";
import { RouterLink } from "vue-router";
import { compareTimestamps, timestampToTimeString } from "@/lib/datetime";
import { computeStdDev } from "@/lib/reports";
import { StudentInfo } from "@/lib/typings";
import { renderIcon } from "@/lib/ui";
import { useStore } from "@/app/composables/use-store";
import { STUDENTS_MAP_INJECTION_KEY } from "@/lib/injection-keys";

const props = defineProps<{
   static?: boolean;
}>();

const themeVars = useThemeVars();
const store = useStore();
const students = inject(STUDENTS_MAP_INJECTION_KEY)!;
const studentsArray = computed(() =>
   Array.from(students.value.values()).filter((student) => student.permitted),
);

const columns: DataTableColumns<StudentInfo> = [
   {
      title: "Student Name",
      key: "studentName",
      ellipsis: props.static ? undefined : { tooltip: { placement: "bottom" } },
      render(row) {
         return row.name;
      },
      sorter: {
         compare(rowA, rowB) {
            return rowA.name.localeCompare(rowB.name);
         },
         multiple: 1,
      },
      defaultSortOrder: "ascend",
      filterMultiple: true,
      filter(value, row) {
         return value === row.id;
      },
   },
   {
      title: "# of Warnings",
      key: "totalLogs",
      sorter: {
         compare(rowA, rowB) {
            return (
               store.countMonitorLogsOfStudent(rowA.id) -
               store.countMonitorLogsOfStudent(rowB.id)
            );
         },
         multiple: 2,
      },
      render(row) {
         return store.countMonitorLogsOfStudent(row.id);
      },
   },
   {
      title: "# of Phone Detections",
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
   },
   {
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
            (studentsIntegrityScoreAvgMap.value.get(row.id)! * 100).toFixed(2) +
            "%"
         );
      },
   },
   {
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
         return (studentsStdDevMap.value.get(row.id)! * 100).toFixed(2) + "%";
      },
   },
   // {
   //    title: "Findings",
   //    key: "findings",
   //    render(row) {
   //       return explainIntegrityAndStdDev(
   //          studentsIntegrityScoreAvgMap.value.get(row.id)!,
   //          studentsStdDevMap.value.get(row.id)!,
   //       );
   //    },
   // },
   {
      title: "Time Joined",
      key: "timeJoined",
      width: 150,
      render(row) {
         return timestampToTimeString(row.timeJoined);
      },
      sorter: {
         compare(rowA, rowB) {
            return (
               Number(rowB.active) - Number(rowA.active) ||
               compareTimestamps(rowA.timeJoined, rowB.timeJoined)
            );
         },
         multiple: 3,
      },
   },
   {
      title: "Time Left",
      key: "timeLeft",
      width: 150,
      render(row) {
         if (!row.timeLeft) return "N/A";
         return timestampToTimeString(row.timeLeft);
      },
      sorter: {
         compare(rowA, rowB) {
            return (
               Number(rowB.active) - Number(rowA.active) ||
               compareTimestamps(rowA.timeLeft, rowB.timeLeft)
            );
         },
         multiple: 3,
      },
   },
];

if (!props.static) {
   columns.push({
      title: "",
      key: "actions",
      width: 50,
      align: "center",
      render(row) {
         return h(
            NPopselect,
            {
               options: [
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
                  },
               ],
               trigger: "click",
               onUpdateValue(v) {
                  console.log(v);
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
   });
}

// Calculations
const studentsIntegrityScoreAvgMap = computed(() => {
   const map = new Map<string | number, number>();
   for (const [_, student] of students.value) {
      let monitorLogs = store.monitorLogsGroupedByStudentId.get(student.id);
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

const studentsStdDevMap = computed(() => {
   const map = new Map<string | number, number>();
   for (const [_, student] of students.value) {
      let monitorLogs = store.monitorLogsGroupedByStudentId.get(student.id);
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
</script>
