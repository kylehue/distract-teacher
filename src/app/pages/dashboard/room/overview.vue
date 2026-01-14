<template>
   <div class="flex flex-wrap gap-4">
      <NCard
         v-for="stat in stats"
         :key="stat.label"
         class="flex-1 min-w-[280px]!"
      >
         <NStatistic :label="stat.label" :value="stat.value">
            <template #prefix>
               <component :is="stat.icon" />
            </template>
            <template #suffix>
               <component v-if="stat.suffix" :is="stat.suffix" />
            </template>
         </NStatistic>
      </NCard>
   </div>
</template>

<script setup lang="ts">
import { NButton, NCard, NStatistic } from "naive-ui";
import Layout from "./layout.vue";
import { renderIcon } from "@/lib/ui";
import {
   PhCalendar,
   PhPassword,
   PhTimer,
   PhUser,
   PhUsers,
} from "@phosphor-icons/vue";
import CopyButton from "@/app/components/copy-button.vue";
import { computed, h, inject, reactive, Ref } from "vue";
import { useStore } from "@/app/composables/use-store";
import { RoomInfo } from "@/lib/typings";
const store = useStore();
const room = inject<Ref<RoomInfo>>("room")!;
const stats = reactive([
   {
      label: "Room Code",
      value: room.value.code,
      icon: renderIcon(PhPassword),
      suffix: () =>
         h(CopyButton, {
            textToCopy: room.value.code,
            hideText: true,
            circle: true,
            quaternary: true,
         }),
   },
   {
      label: "Number of Students",
      value: computed(() => store.countStudentsOfRoom(room.value.id)),
      icon: renderIcon(PhUsers),
   },
   {
      label: "Date Created",
      value: new Date(room.value.createdAt).toLocaleDateString(),
      icon: renderIcon(PhCalendar),
   },
   {
      label: "Time Started",
      value: room.value.timeStarted
         ? new Date(room.value.timeStarted).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
           })
         : "N/A",
      icon: renderIcon(PhTimer),
   },
   {
      label: "Time Ended",
      value: room.value.timeEnded
         ? new Date(room.value.timeEnded).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
           })
         : "N/A",
      icon: renderIcon(PhTimer),
   },
]);
</script>
