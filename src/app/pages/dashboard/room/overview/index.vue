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
      <div class="flex w-full justify-start mt-8 gap-4">
         <NButton
            secondary
            @click="print()"
            :disabled="isLoading"
            :loading="isPrintLoading"
         >
            <template #icon>
               <PhPrinter />
            </template>
            Print Report
         </NButton>
      </div>
   </template>
</template>

<script setup lang="ts">
import { PhPrinter } from "@phosphor-icons/vue";
import { NButton, NConfigProvider, lightTheme } from "naive-ui";
import { computed, inject, nextTick, ref, useTemplateRef } from "vue";
import { useStore } from "@/app/composables/use-store";
import { ROOM_INJECTION_KEY, THEME_INJECTION_KEY } from "@/lib/injection-keys";
import Dashboard from "./dashboard.vue";
import { lightThemeOverrides } from "@/lib/theme-overrides";
import { printElement } from "@/lib/dom";

const store = useStore();
const printDashboard = useTemplateRef("printDashboard");
const theme = inject(THEME_INJECTION_KEY)!;
const isLoading = computed(() => store.isLoadStudentLoading);
const isPrintLoading = ref(false);

// reports data
const room = inject(ROOM_INJECTION_KEY)!;

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
</script>
