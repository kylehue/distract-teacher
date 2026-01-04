<template>
   <div class="flex flex-col gap-4">
      <div class="flex justify-end w-full gap-2">
         <InputSearch
            :documents="studentsArray"
            :fields="['studentName']"
            label-field="studentName"
            id-field="id"
            placeholder="Search students..."
            class="w-fit!"
            @search="
               (ids) => {
                  table?.filters({ studentName: ids });
               }
            "
         ></InputSearch>
      </div>
      <NDataTable
         ref="table"
         :columns="columns"
         :data="studentsArray"
         :pagination="{ pageSize: 10 }"
         :single-line="false"
         :row-class-name="(row) => (!row.active ? 'opacity-50' : '')"
      />
   </div>
</template>

<script setup lang="ts">
import { DataTableColumns, NButton, NDataTable, NTag, NText } from "naive-ui";
import { computed, h, useTemplateRef } from "vue";
import { RoomStudentInfo } from "@/lib/typings";
import { RouterLink, useRoute } from "vue-router";
import InputSearch from "@/app/components/input-search.vue";
import { getWithDefault } from "@/lib/object";
import { useStore } from "@/app/composables/use-store";

const table = useTemplateRef("table");
const route = useRoute();
const store = useStore();
const room = computed(() =>
   store.allRooms.get(Number(route.params.roomId as string))
);
const students = computed(() =>
   getWithDefault(
      store.studentsGroupedByRoomId,
      room.value?.id || "",
      new Map() as typeof store.allStudents
   )
);
const studentsArray = computed(() => Array.from(students.value.values()));
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
      sorter: {
         compare(rowA, rowB) {
            return rowA.studentName.localeCompare(rowB.studentName);
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
      title: "Total Logs",
      key: "totalLogs",
      sorter: {
         compare(rowA, rowB) {
            return rowA.totalLogs - rowB.totalLogs;
         },
         multiple: 2,
      },
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
      sorter: {
         compare(rowA, rowB) {
            const timeA = rowA.timeJoined || 0;
            const timeB = rowB.timeJoined || 0;
            return timeA - timeB;
         },
         multiple: 3,
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
      sorter: {
         compare(rowA, rowB) {
            const timeA = rowA.timeLeft || 0;
            const timeB = rowB.timeLeft || 0;
            return timeA - timeB;
         },
         multiple: 3,
      },
   },
   {
      title: "Actions",
      key: "actions",
      render(row) {
         return h("div", { class: "flex flex-col gap-2" }, [
            h(
               RouterLink,
               { to: "" },
               {
                  default: () =>
                     h(
                        NButton,
                        { size: "small" },
                        { default: () => "Reports" }
                     ),
               }
            ),
            h(
               RouterLink,
               {
                  to: {
                     path: "monitoring",
                     query: { filterByStudent: row.id },
                  },
               },
               {
                  default: () =>
                     h(
                        NButton,
                        { size: "small" },
                        { default: () => "View Logs" }
                     ),
               }
            ),
         ]);
      },
   },
];
</script>
