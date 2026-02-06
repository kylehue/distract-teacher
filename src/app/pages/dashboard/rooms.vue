<template>
   <Layout title="Rooms">
      <div class="flex justify-end gap-2 mb-4">
         <InputSearch
            :documents="roomsArray"
            :fields="['title', 'code']"
            label-field="title"
            id-field="id"
            placeholder="Search rooms..."
            class="w-fit!"
            @search="
               (ids) => {
                  table?.filters({ title: ids });
               }
            "
         ></InputSearch>
      </div>
      <div class="flex flex-col w-full h-full overflow-hidden">
         <NDataTable
            ref="table"
            :columns="columns"
            :data="roomsArray"
            :pagination="{ pageSize: 10 }"
            :single-line="false"
            :loading="store.isLoadRoomsLoading"
            :scroll-x="roomsArray.length ? 900 : undefined"
         >
            <template #empty>
               <NEmpty
                  class="m-auto"
                  description="You haven't created any rooms yet."
               />
            </template>
         </NDataTable>
      </div>
      <template #header-extra>
         <div class="flex flex-row gap-2">
            <NButton @click="createRoom.show()">
               Create Room
               <template #icon><PhPlus></PhPlus></template>
            </NButton>
         </div>
      </template>
   </Layout>
</template>

<script setup lang="ts">
import Layout from "./layout.vue";
import { PhPlus } from "@phosphor-icons/vue";
import { NButton, NDataTable, NText, NEmpty, DataTableColumns } from "naive-ui";
import InputSearch from "@/app/components/input-search.vue";
import CopyButton from "@/app/components/copy-button.vue";
import { computed, h, onMounted, useTemplateRef, reactive } from "vue";
import { RoomInfo } from "@/lib/typings";
import { RouterLink } from "vue-router";
import { useStore } from "@/app/composables/use-store";
import { useCreateRoom } from "@/app/composables/use-create-room";
import {
   compareTimestamps,
   timestampToDateString,
   timestampToTimeString,
} from "@/lib/datetime";

const store = useStore();
const createRoom = useCreateRoom();
const table = useTemplateRef("table");

const columns: DataTableColumns<RoomInfo> = reactive([
   {
      title: "Title",
      key: "title",
      ellipsis: { tooltip: { placement: "bottom" } },
      sorter: {
         compare: (a, b) => a.title.localeCompare(b.title),
         multiple: 1,
      },
      filterMultiple: true,
      filter(value, row) {
         return value === row.id;
      },
   },
   {
      title: "Code",
      key: "code",
      render(row) {
         return h(CopyButton, {
            textToCopy: row.code,
            size: "small",
            quaternary: true,
            textClass: "font-mono",
         });
      },
      ellipsis: { tooltip: { placement: "bottom" } },
      align: "center",
   },
   {
      title: "Students",
      key: "students",
      render(row) {
         return `${row.studentCount} / ${row.studentCapacity}`;
      },
      sorter: {
         compare(rowA, rowB) {
            return rowA.studentCount - rowB.studentCount;
         },
         multiple: 2,
      },
   },
   {
      title: "Status",
      key: "status",
      render(row) {
         let color: "error" | "success" = "error";
         if (row.status !== "concluded") color = "success";
         return h(
            NText,
            { type: color },
            {
               default: () =>
                  row.status !== "concluded" ? "Ongoing" : "Concluded",
            },
         );
      },
      filterOptions: [
         { label: "Ongoing", value: "ongoing" },
         { label: "Concluded", value: "concluded" },
      ],
      filter(value, row) {
         if (value === "ongoing") {
            return row.status !== "concluded";
         } else {
            return row.status === "concluded";
         }
      },
      sorter: {
         compare(rowA, rowB) {
            const statusA = rowA.status !== "concluded" ? 1 : 0;
            const statusB = rowB.status !== "concluded" ? 1 : 0;
            return statusB - statusA;
         },
         multiple: 5,
      },
   },
   {
      title: "Time Started",
      key: "timeStarted",
      render(row) {
         if (!row.timeStarted) return "N/A";
         return timestampToTimeString(row.timeStarted);
      },
      sorter: {
         compare(rowA, rowB) {
            return compareTimestamps(rowA.timeStarted, rowB.timeStarted);
         },
         multiple: 3,
      },
   },
   {
      title: "Time Ended",
      key: "timeEnded",
      render(row) {
         if (!row.timeEnded) return "N/A";
         return timestampToTimeString(row.timeEnded);
      },
      sorter: {
         compare(rowA, rowB) {
            return compareTimestamps(rowA.timeEnded, rowB.timeEnded);
         },
         multiple: 3,
      },
   },
   {
      title: "Date Created",
      key: "dateCreated",
      render(row) {
         return timestampToDateString(row.createdAt);
      },
      sorter: {
         compare(rowA, rowB) {
            return compareTimestamps(rowA.createdAt, rowB.createdAt);
         },
         multiple: 4,
      },
      defaultSortOrder: "descend",
   },
   {
      title: "",
      key: "actions",
      width: 120,
      align: "center",
      fixed: "right",
      render(row) {
         return h(
            RouterLink,
            { to: "/dashboard/rooms/" + row.id },
            {
               default: () =>
                  h(
                     NButton,
                     { size: "small", tertiary: true },
                     { default: () => "View Room" },
                  ),
            },
         );
      },
   },
]);

const roomsArray = computed(() => Array.from(store.allRooms.values()));
onMounted(() => {
   store.loadRooms();
});
</script>
