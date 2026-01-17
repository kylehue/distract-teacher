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
         <NEmpty
            v-else-if="!monitorLog"
            description="Not found"
            size="huge"
         />
         <div v-else class="flex w-full h-full gap-8">
            <div class="flex min-w-[140px]">
               <NDescriptions label-placement="top" class="w-full" :column="1">
                  <NDescriptionsItem label="Student Name">
                     <NText class="block max-w-[200px]">
                        {{ student?.name || "<unknown>" }}
                     </NText>
                  </NDescriptionsItem>
                  <NDescriptionsItem label="Room">
                     <NText class="block max-w-[200px]">
                        {{ room?.title || "<unknown>" }}
                     </NText>
                  </NDescriptionsItem>
                  <NDescriptionsItem label="Date">
                     {{ timestampToDateString(monitorLog.createdAt) }}
                  </NDescriptionsItem>
                  <NDescriptionsItem label="Time">
                     {{ timestampToTimeString(monitorLog.createdAt, false, true) }}
                  </NDescriptionsItem>
                  <NDescriptionsItem label="Warning Level">
                     <NTag type="warning" round>Moderate</NTag>
                  </NDescriptionsItem>
               </NDescriptions>
            </div>
            <div
               v-if="!monitorLog.recordingUrl"
               class="flex items-center justify-center"
            >
               <NEmpty
                  description="Recording is either still being processed or unavailable. Please try again later."
                  align="center"
                  class="max-w-[300px]"
                  size="huge"
               >
                  <template #icon><PhVideoCameraSlash/></template>
               </NEmpty>
            </div>
            <video
               v-else
               class="max-w-[calc(80vw-200px)] max-h-[70vh] min-w-[320px] min-h-[180px] rounded object-contain"
               controls
               :src="monitorLog.recordingUrl"
               type="video/webm"
            >
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
import { MonitorLog, RoomInfo, StudentInfo } from "@/lib/typings";
import { useRoute, useRouter } from "vue-router";
import { PhVideoCameraSlash } from "@phosphor-icons/vue";
import { timestampToDateString, timestampToTimeString } from "@/lib/datetime";

const show = ref(false);
const store = useStore();
const student = ref<StudentInfo>();
const room = ref<RoomInfo>();
const monitorLog = ref<MonitorLog>();
const route = useRoute();
const router = useRouter();

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

watch(show, (show) => {
   if (!show) {
      const { monitorLogId, ...rest } = route.query;
      router.replace({ query: rest });
   }
});
</script>
