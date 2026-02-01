<template>
   <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between w-full gap-2">
         <NBadge :value="numberOfJoinRequests">
            <NCheckbox v-model:checked="showJoinRequests">
               Show Join Requests
            </NCheckbox>
         </NBadge>
         <InputSearch
            :documents="allStudentsPreprocessed"
            :fields="['name']"
            label-field="name"
            id-field="id"
            placeholder="Search students..."
            class="w-fit!"
            @search="
               (ids) => {
                  table?.filters({ name: ids });
               }
            "
         ></InputSearch>
      </div>
      <NDataTable
         ref="table"
         :columns="columns"
         :data="allStudentsPreprocessed"
         :pagination="{ pageSize: 10 }"
         :single-line="false"
         :row-class-name="(row) => (!row.active ? 'opacity-50' : '')"
      />
   </div>
</template>

<script setup lang="ts">
import {
   DataTableColumns,
   NBadge,
   NButton,
   NCheckbox,
   NDataTable,
   NPopselect,
   NTag,
   NText,
   useMessage,
   useThemeVars,
} from "naive-ui";
import { computed, h, inject, onMounted, Ref, ref, useTemplateRef } from "vue";
import { RoomInfo, StudentInfo } from "@/lib/typings";
import { RouterLink, useRoute, useRouter } from "vue-router";
import InputSearch from "@/app/components/input-search.vue";
import { getWithDefault } from "@/lib/object";
import { useStore } from "@/app/composables/use-store";
import { renderIcon } from "@/lib/ui";
import { PhDotsThreeVertical } from "@phosphor-icons/vue";
import { compareTimestamps, timestampToTimeString } from "@/lib/datetime";
import {
   MONITOR_LOGS_MAP_INJECTION_KEY,
   STUDENTS_INJECTION_KEY,
} from "@/lib/injection-keys";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { useFetch } from "@/app/composables/use-fetch";

const table = useTemplateRef("table");
const route = useRoute();
const store = useStore();
const theme = useThemeVars();
const patchStudent = useFetch<{ student: StudentInfo }>(
   "/api/students/:studentId",
   "PATCH",
);
const showJoinRequests = ref(false);
const message = useMessage();
const allStudents = inject(STUDENTS_INJECTION_KEY)!;
const allStudentsPreprocessed = computed(() => {
   if (!showJoinRequests.value) {
      return allStudents.value.filter((student) => student.permitted);
   }

   return allStudents.value;
});
const numberOfJoinRequests = computed(() => {
   return allStudents.value.filter((student) => !student.permitted).length;
});
const columns: DataTableColumns<StudentInfo> = [
   {
      title: "Student Name",
      key: "studentName",
      ellipsis: { tooltip: { placement: "bottom" } },
      render(row) {
         return h("div", { class: "flex flex-wrap items-center gap-1" }, [
            h(NText, null, { default: () => row.name }),
            !row.active
               ? h(
                    NTag,
                    { type: "default", round: true, size: "small" },
                    { default: () => "Inactive" },
                 )
               : "",
            !row.permitted
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
   },
   {
      title: "# of Warnings",
      key: "totalLogs",
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
   },
   {
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
   },
   {
      title: "",
      key: "actions",
      width: 50,
      align: "center",
      render(row) {
         let options: SelectMixedOption[] = [
            {
               value: "approve",
               label: "Approve",
               style: { color: theme.value.successColor },
               disabled: row.permitted,
            },
            {
               value: "reject",
               label: "Reject",
               style: { color: theme.value.errorColor },
               disabled: row.permitted || !row.active,
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
            {
               value: "kick",
               label: "Kick",
               style: { color: theme.value.errorColor },
               disabled: !row.permitted,
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
                  if (v === "approve" || v == "reject" || v === "kick") {
                     try {
                        await patchStudent.execute({
                           params: { studentId: row.id },
                           body: { permitted: v === "approve" && v !== "kick" },
                        });
                     } catch {
                        message.error(
                           patchStudent.error?.message ||
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
                              { size: "small", circle: true, quaternary: true },
                              { default: renderIcon(PhDotsThreeVertical) },
                           ),
                     },
                  ),
            },
         );
      },
   },
];
</script>
