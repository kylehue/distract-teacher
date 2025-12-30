<template>
   <Layout no-divider>
      <template v-if="!!roomInfo" #header>
         <div class="flex items-center gap-2">
            <NText strong class="text-lg">
               {{ roomInfo.title }}
            </NText>
            <NTag
               :type="roomInfo.status !== 'concluded' ? 'success' : 'error'"
               round
            >
               {{ roomInfo.status !== "concluded" ? "Ongoing" : "Concluded" }}
            </NTag>
         </div>
      </template>
      <template #header-extra>
         <RouterLink to="/dashboard/rooms">
            <NButton text>Back To Rooms</NButton>
         </RouterLink>
      </template>
      <div
         v-if="!roomInfo"
         class="flex items-center justify-center w-full h-full"
      >
         <div v-if="isRoomLoading" class="flex gap-2 items-center">
            <NSpin></NSpin>
            <NText>Loading...</NText>
         </div>
         <div v-else class="flex gap-2 items-center">
            <NText>Room not found</NText>
         </div>
      </div>
      <template v-else>
         <NTabs type="card" :value="activeKey" @update:value="router.push">
            <NTab v-for="tab in tabs" :key="tab.key" :name="tab.key">
               <RouterLink :to="tab.key">
                  <div class="flex gap-2 items-center">
                     <component v-if="tab.icon" :is="tab.icon" />
                     {{ tab.name }}
                  </div>
               </RouterLink>
            </NTab>
         </NTabs>
         <div class="py-4">
            <RouterView />
         </div>
      </template>
   </Layout>
</template>

<script setup lang="ts">
import { NButton, NTabs, NTab, NSpin, NText, NTag } from "naive-ui";
import Layout from "../layout.vue";
import { computed, watch, onMounted, ref, onUnmounted } from "vue";
import { useRouter, useRoute, RouterLink, RouterView } from "vue-router";
import { renderIcon } from "@/lib/ui";
import { PhGear, PhHouse, PhUserFocus, PhUsers } from "@phosphor-icons/vue";
import { useSocket } from "@/app/composables/use-socket";
import { MonitorLog, RoomInfo, RoomStudentInfo } from "@/lib/typings";
import { useSocketEvent } from "@/app/composables/use-socket.event";
import { roomInfo, studentInfos, monitorLogs } from "./store";
import { createMappingById } from "@/lib/object";

const router = useRouter();
const route = useRoute();
const socket = useSocket();

const tabs = [
   { name: "Overview", key: "overview", icon: renderIcon(PhHouse) },
   { name: "Monitoring", key: "monitoring", icon: renderIcon(PhUserFocus) },
   { name: "Students", key: "students", icon: renderIcon(PhUsers) },
   { name: "Settings", key: "settings", icon: renderIcon(PhGear) },
];
const activeKey = computed(() => route.path.split("/").pop() || "overview");

// initial load update
const { data: loadRoomData, isLoading: isRoomLoading } = useSocketEvent<{
   room: RoomInfo;
   students: RoomStudentInfo[];
   monitorLogs: MonitorLog[];
}>({
   successEvent: "teacher:load_room_success",
   errorEvent: "teacher:load_room_error",
   executeEvent: "teacher:load_room",
   executePayload: { roomId: route.params.roomId },
   executeImmediately: true,
});

watch(loadRoomData, (data) => {
   roomInfo.value = data?.room ?? null;
   studentInfos.value = createMappingById(data?.students ?? []);
   monitorLogs.value = createMappingById(data?.monitorLogs ?? []);
});

// real-time updates
socket.on("teacher:update_room", (data) => {
   const room = data.room as RoomInfo;
   roomInfo.value = room;
});

socket.on("teacher:create_student", (data) => {
   const student = data.student as RoomStudentInfo;
   studentInfos.value.set(student.id, student);
});

socket.on("teacher:update_student", (data) => {
   const student = data.student as RoomStudentInfo;
   studentInfos.value.set(student.id, student);
});

socket.on("teacher:create_monitor_log", (data) => {
   console.table(data.monitorLog);
   monitorLogs.value.set(data.monitorLog.id, data.monitorLog);
});

// reset store on unmount
onUnmounted(() => {
   roomInfo.value = null;
   studentInfos.value = new Map();
   monitorLogs.value = new Map();
});
</script>
