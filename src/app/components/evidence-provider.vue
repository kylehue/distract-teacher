<template>
   <NModal v-model:show="show" closable>
      <NCard
         title="Evidence"
         closable
         @close="show = false"
         class="w-fit! min-w-[300px] min-h-[200px] max-w-[calc(100vw-100px)]"
         content-class="flex items-center justify-center w-full h-full"
      >
         <template v-if="monitorLog" #action>
            <div class="flex flex-wrap justify-around gap-x-16 gap-y-8 min-w-[140px]">
               <NStatistic label="Student Name">
                  <NText class="block max-w-[200px] text-lg!">
                     {{ student?.name || "<unknown>" }}
                  </NText>
               </NStatistic>
               <NStatistic label="Room">
                  <NText class="block max-w-[200px] text-lg!">
                     {{ room?.title || "<unknown>" }}
                  </NText>
               </NStatistic>
               <NStatistic label="Date">
                  <NText class="block max-w-[200px] text-lg!">
                     {{ timestampToDateString(monitorLog.createdAt) }}
                  </NText>
               </NStatistic>
               <NStatistic label="Time">
                  <NText class="block max-w-[200px] text-lg!">
                     {{ timestampToTimeString(monitorLog.createdAt, false, true) }}
                  </NText>
               </NStatistic>
               <NStatistic label="Integrity Score">
                  <NText class="block max-w-[200px] text-lg!">
                     {{ (monitorLog.integrityScore * 100).toFixed(2) }}%
                  </NText>
               </NStatistic>
               <NStatistic label="Warning Level">
                  <NTag
                     :type="warningLevelToComponentType(monitorLog.warningLevel)"
                     round
                  >
                     {{ monitorLog.warningLevel }}
                  </NTag>
               </NStatistic>
            </div>
         </template>
         <div
            v-if="
               store.isLoadMonitorLogLoading ||
               store.isLoadStudentLoading ||
               store.isLoadRoomLoading
            "
            class="flex items-center gap-2"
         >
            <NSpin />
            Loading...
         </div>
         <NEmpty v-else-if="!monitorLog" description="Not found" size="huge" />
         <div v-else class="flex flex-wrap justify-around w-full h-full gap-8">
            <!-- feature impact grouped rank bar chart -->
            <div class="flex items-center justify-center flex-col gap-2">
               <NText>Feature Impact Ranking</NText>
               <FeatureImpactRankChart :monitorLog="monitorLog" height="300" />
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
                  <template #icon><PhVideoCameraSlash /></template>
               </NEmpty>
            </div>
            <video
               v-else
               class="max-w-[calc(80vw-200px)] min-w-[320px] max-h-[calc(100vh-300px)] min-h-[180px] rounded object-contain"
               controls
               :src="monitorLog.recordingUrl"
               type="video/webm"
            ></video>
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
   NStatistic,
   NTag,
   NText,
} from "naive-ui";
import { ref, watch } from "vue";
import { useStore } from "../composables/use-store";
import { MonitorLog, RoomInfo, StudentInfo } from "@/lib/typings";
import { useRoute, useRouter } from "vue-router";
import { PhVideoCameraSlash } from "@phosphor-icons/vue";
import { timestampToDateString, timestampToTimeString } from "@/lib/datetime";
import { warningLevelToComponentType } from "@/lib/ui";
import FeatureImpactRankChart from "./feature-impact-rank-chart.vue";

const show = ref(false);
const store = useStore();
const student = ref<StudentInfo>();
const room = ref<RoomInfo>();
const monitorLog = ref<MonitorLog>();
const route = useRoute();
const router = useRouter();

watch(
   () => route.query.monitorLogId,
   async (newId) => {
      if (newId) {
         show.value = true;

         const data = await store.loadMonitorLog(Number(newId));
         if (!data) return;
         room.value = data.room;
         student.value = data.student;
         monitorLog.value = data.monitorLog;
         // monitorLog.value.recordingUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
      } else {
         show.value = false;
      }
   },
);

watch(show, (show) => {
   if (!show) {
      const { monitorLogId, ...rest } = route.query;
      router.replace({ query: rest });
   }
});
</script>
