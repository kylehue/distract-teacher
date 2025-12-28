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
         :loading="isLoadRoomStudentsDataLoading"
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
import Layout from "./layout.vue";
import { computed, h, watch } from "vue";
import { RoomInfo, RoomStudentInfo } from "@/lib/typings";
import { PhMagnifyingGlass } from "@phosphor-icons/vue";
import { useSocket } from "@/app/composables/use-socket";
import { studentInfos } from "./store";
import { useSocketEvent } from "@/app/composables/use-socket.event";
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

const { data: loadRoomStudentsData, isLoading: isLoadRoomStudentsDataLoading } =
   useSocketEvent<{ students: RoomStudentInfo[] }>({
      successEvent: "teacher:load_room_students_success",
      errorEvent: "teacher:load_room_students_error",
      executeEvent: "teacher:load_room_students",
      executePayload: { roomId: route.params.roomId },
      executeImmediately: true,
   });

watch(loadRoomStudentsData, (newVal) => {
   studentInfos.value = newVal?.students ?? [];
});

const sortedStudentInfos = computed(() =>
   studentInfos.value.sort((a, b) => {
      // first sort by active (inactives go last)
      if (a.active !== b.active) return a.active ? -1 : 1;
      // then sort by studentName
      return a.studentName.localeCompare(b.studentName);
   })
);
</script>
