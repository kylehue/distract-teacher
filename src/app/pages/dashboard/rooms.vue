<template>
   <Layout title="Rooms">
      <DataView
         :items="roomsArray"
         :loading="store.isLoadRoomsLoading"
         :search="{
            fields: ['title', 'code'],
            labelField: 'title',
            idField: 'id',
         }"
         :sort="{
            options: [
               {
                  key: 'createdAt',
                  label: 'Date Created',
                  compare: (a, b) =>
                     compareTimestamps(a.createdAt, b.createdAt),
                  priority: 5,
               },
               {
                  key: 'timeStarted',
                  label: 'Time Started',
                  compare: (a, b) =>
                     compareTimestamps(a.timeStarted, b.timeStarted),
                  priority: 4,
               },
               {
                  key: 'timeEnded',
                  label: 'Time Ended',
                  compare: (a, b) =>
                     compareTimestamps(a.timeEnded, b.timeEnded),
                  priority: 4,
               },
               {
                  key: 'studentCount',
                  label: 'Students',
                  compare: (a, b) => a.studentCount - b.studentCount,
                  priority: 3,
               },
               {
                  key: 'title',
                  label: 'Title',
                  compare: (a, b) => a.title.localeCompare(b.title),
                  priority: 2,
               },
            ],
            defaultRules: [{ key: 'createdAt', direction: 'desc' }],
         }"
         :column-filter="{
            columns: [
               {
                  key: 'status',
                  label: 'Status',
                  options: [
                     { label: 'Monitoring', value: 'monitoring' },
                     { label: 'Paused', value: 'paused' },
                     { label: 'Concluded', value: 'concluded' },
                  ],
               },
            ],
         }"
      >
         <template #empty>
            <NEmpty
               class="m-auto"
               description="You haven't created any rooms yet."
            />
         </template>
         <template #item="{ item: room }">
            <RowCard
               bordered
               :title="room.title"
               :tags="[
                  {
                     label: toTitleCase(room.status),
                     type: roomStatusToComponentType(room.status),
                  },
               ]"
            >
               <template #content>
                  <div class="flex flex-wrap items-center gap-x-12 gap-y-4">
                     <Statistic title="Room Code">
                        {{ room.code }}
                        <template #icon><PhHash /></template>
                     </Statistic>
                     <Statistic title="Students">
                        {{ room.studentCount }} /
                        {{ room.studentCapacity }}
                        <template #icon><PhUsers /></template>
                     </Statistic>
                     <Statistic title="Time Started">
                        {{
                           room.timeStarted
                              ? timestampToTimeString(room.timeStarted)
                              : "N/A"
                        }}
                        <template #icon><PhTimer /></template>
                     </Statistic>
                     <Statistic title="Time Ended">
                        {{
                           room.timeEnded
                              ? timestampToTimeString(room.timeEnded)
                              : "N/A"
                        }}
                        <template #icon><PhTimer /></template>
                     </Statistic>
                  </div>
               </template>
               <template #footer>
                  <NTooltip placement="bottom">
                     <template #trigger>
                        <NText :depth="3" class="text-xs">
                           Created –
                           {{ timestampToDateString(room.createdAt, true) }}
                        </NText>
                     </template>
                     {{ timestampToDateString(room.createdAt) }} at
                     {{ timestampToTimeString(room.createdAt) }}
                  </NTooltip>
               </template>
               <template #action>
                  <RouterLink :to="`/dashboard/rooms/${room.id}`">
                     <NButton size="small" quaternary>View Room</NButton>
                  </RouterLink>
               </template>
            </RowCard>
         </template>
      </DataView>
      <template #header-extra>
         <div class="flex flex-row gap-2">
            <NButton @click="createRoom.show()">
               Create Room
               <template #icon><PhPlus></PhPlus></template>
            </NButton>
         </div>
      </template>
   </Layout>
</template>

<script setup lang="ts">
import Layout from "./layout.vue";
import { PhHash, PhPlus, PhUsers, PhTimer } from "@phosphor-icons/vue";
import { NButton, NText, NEmpty, NTooltip } from "naive-ui";
import { computed, h, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useStore } from "@/app/composables/use-store";
import { useCreateRoom } from "@/app/composables/use-create-room";
import {
   compareTimestamps,
   timestampToDateString,
   timestampToTimeString,
} from "@/lib/datetime";
import DataView from "@/app/components/data-view.vue";
import RowCard from "@/app/components/row-card.vue";
import { roomStatusToComponentType } from "@/lib/ui";
import { toTitleCase } from "@/lib/string";
import Statistic from "@/app/components/statistic.vue";

const store = useStore();
const createRoom = useCreateRoom();

const roomsArray = computed(() => Array.from(store.allRooms.values()));
onMounted(() => {
   store.loadRooms();
});
</script>
