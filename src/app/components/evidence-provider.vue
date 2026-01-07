<template>
   <NModal v-model:show="show" closable>
      <NCard
         title="Evidence"
         closable
         @close="show = false"
         class="w-fit! min-w-[300px] min-h-[200px]"
         content-class="flex items-center justify-center w-full h-full"
      >
         <NSpin
            v-if="
               store.isLoadMonitorLogLoading ||
               store.isLoadStudentLoading ||
               store.isLoadRoomLoading
            "
         />
         <NEmpty v-else-if="!monitorLog" description="Not found" />
         <div v-else class="flex w-full h-full gap-8">
            <div class="flex">
               <NDescriptions label-placement="top" class="w-full" :column="1">
                  <NDescriptionsItem label="Student Name">
                     <NText class="block max-w-[200px]">
                        {{ student?.studentName || "<unknown>" }}
                     </NText>
                  </NDescriptionsItem>
                  <NDescriptionsItem label="Room">
                     <NText class="block max-w-[200px]">
                        {{ room?.title || "<unknown>" }}
                     </NText>
                  </NDescriptionsItem>
                  <NDescriptionsItem label="Date">
                     {{ new Date(monitorLog.createdAt).toLocaleDateString() }}
                  </NDescriptionsItem>
                  <NDescriptionsItem label="Time">
                     {{ new Date(monitorLog.createdAt).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}) }}
                  </NDescriptionsItem>
                  <NDescriptionsItem label="Warning Level">
                     <NTag type="warning" round>Moderate</NTag>
                  </NDescriptionsItem>
               </NDescriptions>
            </div>
            <video
               class="max-w-[calc(80vw-200px)] max-h-[70vh] min-w-[320px] min-h-[180px] rounded object-contain"
               controls
            >
               <source :src="monitorLog.recordingUrl" type="video/mp4" />
            </video>
         </div>
      </NCard>
   </NModal>
</template>

<script setup lang="ts">
import {
   NModal,
   NCard,
   NSpin,
   NEmpty,
   NDescriptions,
   NDescriptionsItem,
   NTag,
   NDivider,
   NText,
} from "naive-ui";
import { ref, watch } from "vue";
import { useStore } from "../composables/use-store";
import { MonitorLog, RoomInfo, RoomStudentInfo } from "@/lib/typings";
import { useRoute } from "vue-router";

const show = ref(false);
const store = useStore();
const student = ref<RoomStudentInfo>();
const room = ref<RoomInfo>();
const monitorLog = ref<MonitorLog>();
const route = useRoute();

watch(() => route.query.monitorLogId, async (newId) => {
   if (newId) {
      show.value = true;

      const data = await store.loadMonitorLog(Number(newId));
      if (!data) return;
      room.value = data.room;
      student.value = data.student;
      monitorLog.value = data.monitorLog;
   } else {
      show.value = false;
   }
});
</script>
