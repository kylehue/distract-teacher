<template>
   <NLayout has-sider class="w-screen h-screen">
      <!-- Sidebar Navigation -->
      <NLayoutSider :collapsed="false" :width="240">
         <div class="flex flex-col p-2 h-full">
            <NMenu
               :options="menuOptions"
               :value="activeKey"
               @update:value="router.push"
               :accordion="true"
            />

            <NButton type="tertiary" class="mt-auto!" block> Logout </NButton>
         </div>
      </NLayoutSider>

      <!-- Main Content Area -->
      <NLayout>
         <NLayoutContent content-class="flex flex-col gap-8 p-8">
            <div class="flex flex-row items-center justify-between">
               <NText strong class="text-lg">{{ title }}</NText>
               <div class="flex">
                  <slot name="header-extra"></slot>
               </div>
            </div>
            <NDivider v-if="!noDivider" class="m-0!" />
            <div class="flex flex-col h-full">
               <slot></slot>
            </div>
         </NLayoutContent>
      </NLayout>
   </NLayout>
</template>

<script setup lang="ts">
import { computed, h } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
   NLayout,
   NLayoutSider,
   NLayoutContent,
   NMenu,
   NButton,
   NText,
   NDivider,
} from "naive-ui";
import { MenuMixedOption } from "naive-ui/es/menu/src/interface";
import { PhChartBar, PhHouse, PhVideoConference } from "@phosphor-icons/vue";
import { renderIcon } from "@/lib/ui";

const props = defineProps<{
   title: string;
   noDivider?: boolean;
}>();

const router = useRouter();
const route = useRoute();

const menuOptions: MenuMixedOption[] = [
   {
      label: "Overview",
      key: "/dashboard/overview",
      icon: renderIcon(PhHouse),
   },
   {
      label: "Rooms",
      key: "/dashboard/rooms",
      icon: renderIcon(PhVideoConference),
   },
   {
      label: "Student Reports",
      key: "/dashboard/reports",
      icon: renderIcon(PhChartBar),
   },
];

const activeKey = computed(() => route.path);
</script>
