<template>
   <template v-if="!room">Nothing</template>
   <div v-else class="flex flex-col w-full h-full gap-4">
      <div class="flex items-center justify-end gap-2">
         <NButtonGroup class="me-auto">
            <NButton
               :focusable="false"
               :type="activeTab === 'seats' ? 'primary' : 'default'"
               :secondary="activeTab === 'seats'"
               @click="activeTab = 'seats'"
               size="small"
            >
               Grid View
            </NButton>
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
      <StudentsSeats v-if="activeTab === 'seats'" />
      <LockedStudents v-if="activeTab === 'lockedStudents'" />
      <WarningLogs v-if="activeTab === 'warningLogs'" />
   </div>
</template>

<script setup lang="ts">
import { NButton, NButtonGroup, NBadge } from "naive-ui";
import { computed, inject, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
   MONITOR_LOGS_MAP_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_MAP_INJECTION_KEY,
} from "@/lib/injection-keys";
import StudentsSeats from "./students-seats.vue";
import LockedStudents from "./locked-students.vue";
import WarningLogs from "./warning-logs.vue";

const TABS = ["seats", "warningLogs", "lockedStudents"] as const;

const route = useRoute();
const router = useRouter();
const room = inject(ROOM_INJECTION_KEY)!;
const students = inject(STUDENTS_MAP_INJECTION_KEY)!;
const monitorLogs = inject(MONITOR_LOGS_MAP_INJECTION_KEY)!;
const activeTab = ref<(typeof TABS)[number]>("seats");

const lockedStudents = computed(() => {
   return Array.from(students.value.values())
      .filter((s) => s.permitted && !!s.lockMonitorLogId)
      .map((v) => ({
         ...v,
         lockMonitorLog: monitorLogs.value.get(v.lockMonitorLogId!)!,
      }));
});

watch(
   () => route.query.tab,
   (newTab: any) => {
      if (TABS.includes(newTab)) {
         activeTab.value = newTab;
      }
   },
   { immediate: true },
);

watch(activeTab, (newTab) => {
   if (route.query.tab !== newTab) {
      const query = { ...route.query, tab: newTab };
      router.replace({ query });
   }
});
</script>
