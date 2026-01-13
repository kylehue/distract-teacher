<template>
   <Layout no-divider>
      <template v-if="!!room" #header>
         <div class="flex items-center gap-2">
            <NText strong class="text-lg">
               {{ room.title }}
            </NText>
            <NTag
               :type="room.status !== 'concluded' ? 'success' : 'error'"
               round
            >
               {{ room.status !== "concluded" ? "Ongoing" : "Concluded" }}
            </NTag>
         </div>
      </template>
      <template #header-extra>
         <RouterLink to="/dashboard/rooms">
            <NButton text>Back To Rooms</NButton>
         </RouterLink>
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
               <RouterLink :to="tab.key">
                  <div class="flex gap-2 items-center">
                     <component v-if="tab.icon" :is="tab.icon" />
                     {{ tab.name }}
                  </div>
               </RouterLink>
            </NTab>
         </NTabs>
         <div class="py-4">
            <RouterView />
         </div>
      </template>
   </Layout>
</template>

<script setup lang="ts">
import { NButton, NTabs, NTab, NSpin, NText, NTag } from "naive-ui";
import Layout from "../layout.vue";
import { computed, onMounted, provide } from "vue";
import { useRouter, useRoute, RouterLink, RouterView } from "vue-router";
import { renderIcon } from "@/lib/ui";
import { PhGear, PhHouse, PhUserFocus, PhUsers } from "@phosphor-icons/vue";
import { useStore } from "@/app/composables/use-store";

const router = useRouter();
const route = useRoute();
const store = useStore();

const room = computed(() =>
   store.allRooms.get(Number(route.params.roomId as string))
);
const tabs = [
   { name: "Overview", key: "overview", icon: renderIcon(PhHouse) },
   { name: "Monitoring", key: "monitoring", icon: renderIcon(PhUserFocus) },
   { name: "Students", key: "students", icon: renderIcon(PhUsers) },
   { name: "Settings", key: "settings", icon: renderIcon(PhGear) },
];
const activeKey = computed(() => route.path.split("/").pop() || "overview");

onMounted(() => {
   store.loadRoom(route.params.roomId as string);
});

provide("room", room);
</script>
