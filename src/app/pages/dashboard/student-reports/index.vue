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
      <div v-if="isLoading" class="flex items-center gap-2">
         <NSpin />
         <NText>Loading student report...</NText>
      </div>
      <NEmpty
         v-else-if="!student || !room || !teacher"
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
         <div class="flex w-full justify-start mt-8 gap-4">
            <NButton
               secondary
               @click="print()"
               :disabled="isLoading"
               :loading="isPrintLoading"
            >
               Print Report
               <template #icon>
                  <PhPrinter />
               </template>
            </NButton>
         </div>
      </template>
   </Layout>
</template>

<script setup lang="ts">
import Layout from "../layout.vue";
import { PhArrowLeft, PhPrinter } from "@phosphor-icons/vue";
import {
   NButton,
   NText,
   NSpin,
   NEmpty,
   NConfigProvider,
   lightTheme,
} from "naive-ui";
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
import { compareTimestamps } from "@/lib/datetime";
import {
   MONITOR_LOGS_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENT_INJECTION_KEY,
   TEACHER_INJECTION_KEY,
   THEME_INJECTION_KEY,
} from "@/lib/injection-keys";
import Dashboard from "./dashboard.vue";
import { lightThemeOverrides } from "@/lib/theme-overrides";
import { printElement, waitForSvg } from "@/lib/dom";
import { useAuthStore } from "@/app/composables/use-auth-store";

const store = useStore();
const auth = useAuthStore();
const route = useRoute();
const printDashboard = useTemplateRef("printDashboard");
const theme = inject(THEME_INJECTION_KEY)!;
const isLoading = computed(() => store.isLoadStudentLoading);
const isPrintLoading = ref(false);

// reports data
const student = computed(
   () =>
      store.allStudents.get(Number(route.params.studentId as string)) ?? null,
);
const room = computed(
   () => store.allRooms.get(student.value?.roomId || -1) ?? null,
);
const teacher = computed(() => auth.teacher);
const monitorLogs = computed(() =>
   Array.from(
      store.monitorLogsGroupedByStudentId
         .get(student.value?.id || -1)
         ?.values() ?? [],
   ).sort((a, b) => compareTimestamps(a.createdAt, b.createdAt)),
);

async function print() {
   isPrintLoading.value = true;
   await nextTick();
   const dashboard = printDashboard.value?.$el as HTMLElement;
   const pdf = await printElement(dashboard, {
      width: "260mm",
      margin: 10,
      // fitToSinglePage: true,
   });
   pdf.save(`Student_Report_${student.value?.name || "unnamed"}.pdf`);
   isPrintLoading.value = false;
}

onMounted(async () => {
   await store.loadStudent(Number(route.params.studentId as string));
});

provide(STUDENT_INJECTION_KEY, student);
provide(ROOM_INJECTION_KEY, room);
provide(TEACHER_INJECTION_KEY, teacher);
provide(MONITOR_LOGS_INJECTION_KEY, monitorLogs);
</script>
