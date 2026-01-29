<template>
   <template v-if="!room">no room</template>
   <template v-else>
      <Dashboard :theme="theme" />
      <NConfigProvider
         v-if="isPrintLoading"
         :theme="lightTheme"
         :theme-overrides="lightThemeOverrides"
      >
         <Dashboard ref="printDashboard" theme="light" static />
      </NConfigProvider>
      <div class="flex w-full justify-start mt-8 gap-2">
         <NButton
            secondary
            @click="print()"
            :disabled="isLoading"
            :loading="isPrintLoading"
         >
            <template #icon>
               <PhPrinter />
            </template>
            Print Summary
         </NButton>
         <NButton secondary @click="exportData()">
            <template #icon>
               <PhFileXls />
            </template>
            Export Room Data
         </NButton>
      </div>
   </template>
</template>

<script setup lang="ts">
import { PhPrinter, PhFileXls } from "@phosphor-icons/vue";
import { NButton, NConfigProvider, lightTheme } from "naive-ui";
import { computed, inject, nextTick, ref, useTemplateRef } from "vue";
import { useStore } from "@/app/composables/use-store";
import {
   MONITOR_LOGS_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_INJECTION_KEY,
   THEME_INJECTION_KEY,
} from "@/lib/injection-keys";
import Dashboard from "./dashboard.vue";
import { lightThemeOverrides } from "@/lib/theme-overrides";
import { printElement } from "@/lib/dom";
import { exportToExcel } from "@/lib/excel";
import { createMonitorLogsReports } from "@/lib/reports";
import { useAuthStore } from "@/app/composables/use-auth-store";

const store = useStore();
const auth = useAuthStore();
const printDashboard = useTemplateRef("printDashboard");
const theme = inject(THEME_INJECTION_KEY)!;
const isLoading = computed(() => store.isLoadStudentLoading);
const isPrintLoading = ref(false);

// reports data
const room = inject(ROOM_INJECTION_KEY)!;
const students = inject(STUDENTS_INJECTION_KEY)!;
const monitorLogs = inject(MONITOR_LOGS_INJECTION_KEY)!;

async function print() {
   isPrintLoading.value = true;
   await nextTick();
   const dashboard = printDashboard.value?.$el as HTMLElement;
   const pdf = await printElement(dashboard, {
      width: "260mm",
      margin: 10,
      // fitToSinglePage: true,
   });
   pdf.save(`Room_Report_${room.value?.code || "unnamed"}.pdf`);
   isPrintLoading.value = false;
}

function exportData() {
   if (!room.value) return;
   if (!students.value) return;
   if (!monitorLogs.value) return;
   if (!auth.teacher) return;

   const monitorLogsGroupedByStudentId = new Map<
      string,
      typeof monitorLogs.value
   >();
   for (const log of monitorLogs.value.values()) {
      if (!monitorLogsGroupedByStudentId.has(log.studentId)) {
         monitorLogsGroupedByStudentId.set(log.studentId, []);
      }
      monitorLogsGroupedByStudentId.get(log.studentId)!.push(log);
   }

   exportToExcel([
      {
         sheetName: "Room",
         data: room.value,
      },
      {
         sheetName: "Teacher",
         data: auth.teacher,
      },
      {
         sheetName: "Students",
         data: Array.from(students.value.values()),
      },
      {
         sheetName: "Monitor Logs",
         data: Array.from(monitorLogs.value.values()),
      },
      {
         sheetName: "Student Reports",
         data: students.value.map((student) => {
            return {
               ...student,
               ...createMonitorLogsReports(
                  monitorLogsGroupedByStudentId.get(student.id) || [],
               ),
            };
         }),
      },
   ]);
}
</script>
