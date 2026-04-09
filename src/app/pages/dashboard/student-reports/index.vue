<template>
   <Layout>
      <template #header>
         <div class="flex items-center gap-2">
            <NButton @click="$router.back()" circle quaternary>
               <template #icon><PhArrowLeft /></template>
            </NButton>
            <NText strong class="text-lg"> Student Report </NText>
         </div>
      </template>
      <template v-if="student && room" #header-extra>
         <div class="flex items-center gap-2">
            <RouterLink
               :to="{
                  name: 'monitoring',
                  query: {
                     filterByStudent: student.id,
                     tab: 'warningLogs',
                  },
                  params: {
                     roomId: room.id,
                  },
               }"
               class="link"
            >
               View Warnings
            </RouterLink>
         </div>
      </template>
      <div
         v-if="isLoading"
         class="flex items-center justify-center w-full h-full"
      >
         <Loader text="Loading student report..." />
      </div>
      <NEmpty
         v-else-if="!student || !room || !teacher"
         class="m-auto"
         description="Data not found."
      />
      <template v-else>
         <Dashboard :theme="theme" />
         <NConfigProvider
            v-if="isPrintLoading"
            :theme="lightTheme"
            :theme-overrides="lightThemeOverrides"
         >
            <Dashboard ref="printDashboard" :theme="'light'" static />
         </NConfigProvider>
         <div class="flex w-full justify-start mt-8 gap-2">
            <NButton
               secondary
               @click="print()"
               :disabled="isLoading"
               :loading="isPrintLoading"
            >
               Print Summary
               <template #icon>
                  <PhPrinter />
               </template>
            </NButton>
            <NButton secondary @click="exportData()">
               <template #icon>
                  <PhFileXls />
               </template>
               Export Student Data
            </NButton>
         </div>
      </template>
   </Layout>
</template>

<script setup lang="ts">
import Layout from "../layout.vue";
import { PhArrowLeft, PhPrinter, PhFileXls } from "@phosphor-icons/vue";
import { NButton, NText, NEmpty, NConfigProvider, lightTheme } from "naive-ui";
import {
   computed,
   inject,
   nextTick,
   onMounted,
   provide,
   ref,
   useTemplateRef,
} from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useStore } from "@/app/composables/use-store";
import {
   MONITOR_LOGS_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENT_INJECTION_KEY,
   STUDENTS_MAP_INJECTION_KEY,
   TEACHER_INJECTION_KEY,
   THEME_INJECTION_KEY,
} from "@/lib/injection-keys";
import Dashboard from "./dashboard.vue";
import { lightThemeOverrides } from "@/lib/theme-overrides";
import { printElement } from "@/lib/dom";
import { useAuthStore } from "@/app/composables/use-auth-store";
import { exportToExcel } from "@/lib/excel";
import {
   createMonitorLogsReports,
   getAndExplainZScores,
} from "@/lib/reports";
import Loader from "@/app/components/loader.vue";
import moment from "moment";

const store = useStore();
const auth = useAuthStore();
const route = useRoute();
const printDashboard = useTemplateRef("printDashboard");
const theme = inject(THEME_INJECTION_KEY)!;
const isLoading = computed(() => store.isLoadStudentLoading);
const isPrintLoading = ref(false);

// reports data
const allStudents = computed(() => store.allStudents);
const student = computed(
   () => store.allStudents.get(route.params.studentId as string) ?? null,
);
const room = computed(
   () => store.allRooms.get(student.value?.roomId ?? "") ?? null,
);
const teacher = computed(() => auth.teacher);
const monitorLogs = computed(() =>
   Array.from(
      store.monitorLogsGroupedByStudentId
         .get(student.value?.id ?? "")
         ?.values() ?? [],
   ).sort((a, b) => moment(a.createdAt).diff(b.createdAt)),
);

async function print() {
   isPrintLoading.value = true;
   await nextTick();
   const dashboard = printDashboard.value?.$el as HTMLElement;
   const pdf = await printElement(dashboard, {
      width: "260mm",
      margin: 10,
      headerText: "Student Reports",
      // fitToSinglePage: true,
   });
   pdf.save(`Student_Report_${student.value?.name || "unnamed"}.pdf`);
   isPrintLoading.value = false;
}

function exportData() {
   if (!student.value) return;
   if (!room.value) return;
   if (!teacher.value) return;
   exportToExcel([
      {
         sheetName: "Student Reports",
         data: {
            ...student.value,
            ...createMonitorLogsReports(monitorLogs.value),
            ...getAndExplainZScores(
               Array.from(allStudents.value.values()),
            ).get(student.value.id)!,
         },
      },
      {
         sheetName: "Monitor Logs",
         data: monitorLogs.value,
      },
      {
         sheetName: "Room",
         data: room.value,
      },
      {
         sheetName: "Teacher",
         data: teacher.value,
      },
   ]);
}

onMounted(async () => {
   await store.loadStudent(route.params.studentId as string);
   await store.loadStudents(room.value?.id || "");
});

provide(STUDENTS_MAP_INJECTION_KEY, allStudents);
provide(STUDENT_INJECTION_KEY, student);
provide(ROOM_INJECTION_KEY, room);
provide(TEACHER_INJECTION_KEY, teacher);
provide(MONITOR_LOGS_INJECTION_KEY, monitorLogs);
</script>
