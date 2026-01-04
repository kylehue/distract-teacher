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

            <NButton
               type="tertiary"
               class="mt-auto!"
               block
               @click="logout"
               :loading="isLogoutLoading"
            >
               Logout
            </NButton>
         </div>
      </NLayoutSider>

      <!-- Main Content Area -->
      <NLayout>
         <NLayoutContent
            class="w-full h-full"
            content-class="flex flex-col p-8"
         >
            <div class="flex flex-row items-center justify-between mb-8">
               <div class="flex items-center">
                  <NText v-if="!!title" strong class="text-lg">
                     {{ title }}
                  </NText>
                  <slot name="header"></slot>
               </div>
               <div class="flex items-center">
                  <slot name="header-extra"></slot>
               </div>
            </div>
            <NDivider v-if="!noDivider" class="m-0!" />
            <div class="flex flex-col h-full">
               <div class="w-full h-4 flex-none"></div>
               <slot></slot>
               <div class="w-full h-8 flex-none"></div>
            </div>
         </NLayoutContent>
      </NLayout>
   </NLayout>
</template>

<script setup lang="ts">
import { computed, h, onMounted, ref } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
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
import { useSocket } from "@/app/composables/use-socket";
import { isUrlRelatedToParent } from "@/lib/url";

const props = defineProps<{
   title?: string;
   noDivider?: boolean;
}>();

const router = useRouter();
const route = useRoute();
const socket = useSocket();
const isLogoutLoading = ref(false);

const menuOptions: MenuMixedOption[] = [
   {
      label: () =>
         h(
            RouterLink,
            { to: "/dashboard/overview" },
            { default: () => "Overview" }
         ),
      key: "/dashboard/overview",
      icon: renderIcon(PhHouse),
   },
   {
      label: () =>
         h(RouterLink, { to: "/dashboard/rooms" }, { default: () => "Rooms" }),
      key: "/dashboard/rooms",
      icon: renderIcon(PhVideoConference),
   },
   {
      label: () =>
         h(
            RouterLink,
            { to: "/dashboard/reports" },
            {
               default: () => "Student Reports",
            }
         ),
      key: "/dashboard/reports",
      icon: renderIcon(PhChartBar),
   },
];

const activeKey = computed(() => {
   const path = route.path;

   if (isUrlRelatedToParent(path, "/dashboard/rooms")) {
      return "/dashboard/rooms";
   }

   if (isUrlRelatedToParent(path, "/dashboard/reports")) {
      return "/dashboard/reports";
   }

   if (isUrlRelatedToParent(path, "/dashboard/overview")) {
      return "/dashboard/overview";
   }

   return path;
});

function logout() {
   isLogoutLoading.value = true;
   socket.emit("teacher:logout", {});
}

socket.on("teacher:logout_success", () => {
   isLogoutLoading.value = false;
});

onMounted(() => {
   socket.emit("teacher:validate_session", { kickOnInvalid: true });
});
</script>
