<template>
   <Layout no-divider>
      <template v-if="!!room" #header>
         <div class="flex items-center gap-2">
            <RouterLink to="/dashboard/rooms">
               <NButton circle quaternary>
                  <template #icon>
                     <PhArrowLeft />
                  </template>
               </NButton>
            </RouterLink>
            <NText strong class="text-lg">
               {{ room.title }}
            </NText>
            <RoomStatusTag :room="room" />
         </div>
      </template>
      <template v-if="!!room && room.status !== 'concluded'" #header-extra>
         <div class="flex items-center gap-1">
            <NTooltip placement="bottom">
               <template #trigger>
                  <NButton
                     type="error"
                     secondary
                     circle
                     @click="stopMonitoring()"
                  >
                     <template #icon>
                        <PhStop />
                     </template>
                  </NButton>
               </template>
               Stop monitoring and conclude room session
            </NTooltip>
            <NTooltip placement="bottom">
               <template #trigger>
                  <NButton
                     type="warning"
                     secondary
                     circle
                     @click="pauseMonitoring()"
                     :disabled="room.status === 'paused'"
                  >
                     <template #icon>
                        <PhPause />
                     </template>
                  </NButton>
               </template>
               Pause monitoring
            </NTooltip>
            <NTooltip placement="bottom">
               <template #trigger>
                  <NButton
                     type="success"
                     secondary
                     circle
                     @click="startMonitoring()"
                     :disabled="room.status === 'monitoring'"
                  >
                     <template #icon>
                        <PhPlay />
                     </template>
                  </NButton>
               </template>
               Start monitoring
            </NTooltip>
         </div>
         <NDivider vertical />
         <NTooltip placement="bottom">
            <template #trigger>
               <NButton circle @click="announcement.show(room)">
                  <template #icon>
                     <PhMegaphoneSimple />
                  </template>
               </NButton>
            </template>
            Send announcement to students
         </NTooltip>
      </template>
      <div v-if="!room" class="flex items-center justify-center w-full h-full">
         <div v-if="store.isLoadRoomLoading" class="flex gap-2 items-center">
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
               <NBadge :value="tab.badgeValue" :offset="[6, -3]">
                  <RouterLink :to="tab.key">
                     <div class="flex gap-2 items-center">
                        <component v-if="tab.icon" :is="tab.icon" />
                        {{ tab.name }}
                     </div>
                  </RouterLink>
               </NBadge>
            </NTab>
         </NTabs>
         <div class="py-4">
            <RouterView />
         </div>
      </template>
   </Layout>
</template>

<script setup lang="ts">
import {
   NButton,
   NTabs,
   NTab,
   NSpin,
   NText,
   NDivider,
   NTooltip,
   NBadge,
   useMessage,
} from "naive-ui";
import Layout from "../layout.vue";
import { computed, onMounted, provide, reactive } from "vue";
import { useRouter, useRoute, RouterLink, RouterView } from "vue-router";
import { renderIcon } from "@/lib/ui";
import {
   PhPause,
   PhPlay,
   PhStop,
   PhArrowLeft,
   PhGear,
   PhHouse,
   PhMegaphoneSimple,
   PhUserFocus,
   PhUsers,
} from "@phosphor-icons/vue";
import { useStore } from "@/app/composables/use-store";
import {
   MONITOR_LOGS_INJECTION_KEY,
   MONITOR_LOGS_MAP_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_INJECTION_KEY,
   STUDENTS_MAP_INJECTION_KEY,
   TEACHER_INJECTION_KEY,
} from "@/lib/injection-keys";
import RoomStatusTag from "@/app/components/room-status-tag.vue";
import { getWithDefault } from "@/lib/object";
import { useAnnouncement } from "@/app/composables/use-announcement";
import { useAuthStore } from "@/app/composables/use-auth-store";
import { useFetch } from "@/app/composables/use-fetch";

const router = useRouter();
const route = useRoute();
const store = useStore();
const auth = useAuthStore();
const announcement = useAnnouncement();
const message = useMessage();
const room = computed(
   () => store.allRooms.get(route.params.roomId as string) ?? null,
);
const monitorLogs = computed(() =>
   getWithDefault(
      store.monitorLogsGroupedByRoomId,
      room.value?.id,
      new Map() as typeof store.allMonitorLogs,
   ),
);
const students = computed(() =>
   getWithDefault(
      store.studentsGroupedByRoomId,
      room.value?.id,
      new Map() as typeof store.allStudents,
   ),
);
const monitorLogsArray = computed(() => Array.from(monitorLogs.value.values()));
const studentsArray = computed(() => Array.from(students.value.values()));
const teacher = computed(() => auth.teacher);
const tabs = reactive([
   { name: "Overview", key: "overview", icon: renderIcon(PhHouse) },
   {
      name: "Monitoring",
      key: "monitoring",
      icon: renderIcon(PhUserFocus),
      badgeValue: computed(
         () =>
            studentsArray.value.filter(
               (v) => v.permitted && !!v.lockMonitorLogId,
            ).length,
      ),
   },
   {
      name: "Students",
      key: "students",
      icon: renderIcon(PhUsers),
      badgeValue: computed(
         () =>
            studentsArray.value.filter((v) => !v.permitted && v.active).length,
      ),
   },
   { name: "Settings", key: "settings", icon: renderIcon(PhGear) },
]);
const activeKey = computed(() => route.path.split("/").pop() || "overview");
const patchStartMonitoring = useFetch("/api/start_monitoring/:roomId", "PATCH");

async function startMonitoring() {
   try {
      await patchStartMonitoring.execute({
         params: { roomId: route.params.roomId },
      });

      message.success("Monitoring has started.", {
         icon: renderIcon(PhPlay),
      });
   } catch (error: any) {
      message.error(error.message);
   }
}

const patchPauseMonitoring = useFetch("/api/pause_monitoring/:roomId", "PATCH");

async function pauseMonitoring() {
   try {
      await patchPauseMonitoring.execute({
         params: { roomId: route.params.roomId },
      });

      message.warning("Monitoring has been paused.", {
         icon: renderIcon(PhPause),
      });
   } catch (error: any) {
      message.error(error.message);
   }
}

const patchStopMonitoring = useFetch("/api/stop_monitoring/:roomId", "PATCH");

async function stopMonitoring() {
   let confirmed = confirm(
      "Are you sure you want to stop monitoring? This will conclude and archive the room session. This action cannot be undone.",
   );
   if (!confirmed) {
      return;
   }

   try {
      await patchStopMonitoring.execute({
         params: { roomId: route.params.roomId },
      });

      message.error("Monitoring has been stopped.", {
         icon: renderIcon(PhStop),
      });
   } catch (error: any) {
      message.error(error.message);
   }
}

onMounted(() => {
   store.loadRoom(route.params.roomId as string);
   (window as any).$store = store;
});

provide(ROOM_INJECTION_KEY, room);
provide(MONITOR_LOGS_MAP_INJECTION_KEY, monitorLogs);
provide(STUDENTS_MAP_INJECTION_KEY, students);
provide(TEACHER_INJECTION_KEY, teacher);
provide(MONITOR_LOGS_INJECTION_KEY, monitorLogsArray);
provide(STUDENTS_INJECTION_KEY, studentsArray);
</script>
