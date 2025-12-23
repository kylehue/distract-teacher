<template>
   <Layout title="Test Room 1" no-divider>
      <template #header-extra>
         <NButton text>Back</NButton>
      </template>
      <NTabs type="card" :value="activeKey" @update:value="router.push">
         <NTab v-for="tab in tabs" :key="tab.key" :name="tab.key">
            <div class="flex gap-2 items-center">
               <component v-if="tab.icon" :is="tab.icon" />
               {{ tab.name }}
            </div>
         </NTab>
      </NTabs>
      <div class="py-4">
         <slot></slot>
      </div>
   </Layout>
</template>

<script setup lang="ts">
import { NButton, NTabPane, NTabs, NTab, NText } from "naive-ui";
import Layout from "../layout.vue";
import { computed, ref, render, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { renderIcon } from "@/lib/ui";
import { PhGear, PhHouse, PhUserFocus, PhUsers } from "@phosphor-icons/vue";
const router = useRouter();
const route = useRoute();
const tabs = [
   { name: "Overview", key: "overview", icon: renderIcon(PhHouse) },
   { name: "Monitoring", key: "monitoring", icon: renderIcon(PhUserFocus) },
   { name: "Students", key: "students", icon: renderIcon(PhUsers) },
   { name: "Settings", key: "settings", icon: renderIcon(PhGear) },
];

const activeKey = computed(() => route.path.split("/").pop() || "overview");

watch(activeKey, (newKey) => {
   console.log(newKey);
});
</script>
