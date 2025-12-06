<template>
  <n-layout has-sider>
    <!-- Sidebar Navigation -->
    <n-layout-sider
      :collapsed="false"
      :collapsed-width="0"
      :width="240"
      class="bg-slate-900"
    >
      <div class="p-6">
        <h1 class="text-2xl font-bold mb-8 text-blue-400">Distract Teacher</h1>

        <n-menu
          :options="menuOptions"
          :value="activeKey"
          @update:value="handleMenuSelect"
          :accordion="true"
        />

        <div class="mt-8 pt-6 border-t border-gray-700">
          <n-button type="error" block @click="handleLogout"> Logout </n-button>
        </div>
      </div>
    </n-layout-sider>

    <!-- Main Content Area -->
    <n-layout>
      <n-layout-content class="p-8">
        <RouterView />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NMenu,
  NButton,
} from "naive-ui";

const router = useRouter();
const route = useRoute();

const menuOptions = [
  {
    label: "📊 Overview",
    key: "/dashboard/overview",
  },
  {
    label: "🏫 Rooms",
    key: "/dashboard/rooms",
  },
  {
    label: "📋 Reports",
    key: "/dashboard/reports",
  },
  {
    label: "📷 Evidence",
    key: "/dashboard/evidence",
  },
];

const activeKey = computed(() => route.path);

const handleMenuSelect = (key: string) => {
  router.push(key);
};

const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user");
  localStorage.removeItem("currentUser");
  router.push("/login");
};
</script>
