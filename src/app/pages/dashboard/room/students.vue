<template>
   <div class="flex flex-col gap-4">
      <div class="flex justify-end w-full gap-2">
         <NInput placeholder="Search Students" class="w-fit!">
            <template #prefix>
               <PhMagnifyingGlass></PhMagnifyingGlass>
            </template>
         </NInput>
      </div>
      <NDataTable
         :columns="columns"
         :data="sortedStudentInfos"
         :pagination="{ pageSize: 10 }"
         :single-line="false"
         :row-class-name="(row) => (!row.active ? 'opacity-50' : '')"
      />
   </div>
</template>

<script setup lang="ts">
import {
   DataTableColumns,
   NButton,
   NDataTable,
   NTag,
   NInput,
   NText,
} from "naive-ui";
import { computed, h, watch } from "vue";
import { RoomInfo, RoomStudentInfo } from "@/lib/typings";
import { PhMagnifyingGlass } from "@phosphor-icons/vue";
import { studentInfos } from "./store";
import { useRoute } from "vue-router";

const route = useRoute();
const columns: DataTableColumns<RoomStudentInfo> = [
   {
      title: "Student Name",
      key: "studentName",
      ellipsis: { tooltip: { placement: "bottom" } },
      render(row) {
         return h("div", { class: "flex flex-wrap items-center gap-1" }, [
            h(NText, null, { default: () => row.studentName }),
            !row.active
               ? h(
                    NTag,
                    { type: "error", round: true, size: "small" },
                    { default: () => "Out of room" }
                 )
               : "",
         ]);
      },
   },
   {
      title: "Total Logs",
      key: "totalLogs",
   },
   {
      title: "Time Joined",
      key: "timeJoined",
      render(row) {
         const date = new Date(row.timeJoined);
         return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
         });
      },
   },
   {
      title: "Time Left",
      key: "timeLeft",
      render(row) {
         if (!row.timeLeft) return "N/A";
         const date = new Date(row.timeLeft);
         return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
         });
      },
   },
   {
      title: "Actions",
      key: "actions",
      render() {
         return h("div", { class: "flex flex-col gap-2" }, [
            h(
               NButton,
               {
                  size: "small",
                  onClick: () => {},
               },
               { default: () => "Reports" }
            ),
            h(
               NButton,
               {
                  size: "small",
                  onClick: () => {},
               },
               { default: () => "View Logs" }
            ),
         ]);
      },
   },
];

const sortedStudentInfos = computed(() =>
   Array.from(studentInfos.value.values()).sort((a, b) => {
      // first sort by active (inactives go last)
      if (a.active !== b.active) return a.active ? -1 : 1;
      // then sort by studentName
      return a.studentName.localeCompare(b.studentName);
   })
);
</script>
