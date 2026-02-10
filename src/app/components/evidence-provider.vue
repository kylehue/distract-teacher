<template>
   <!-- use v-if to fix chart not resizing properly -->
   <NModal v-if="show" v-model:show="show" closable>
      <NCard
         title="Evidence"
         closable
         @close="show = false"
         class="w-fit! min-w-[300px] min-h-[200px] max-w-[calc(100vw-100px)]"
         content-class="flex items-center justify-center w-full h-full"
      >
         <template #action v-if="monitorLog && student && room">
            <div
               class="flex flex-wrap justify-around gap-x-16 gap-y-8 min-w-[140px]"
            >
               <NStatistic label="Student Name">
                  <NText class="block max-w-[200px] text-lg!">
                     {{ student.name }}
                  </NText>
               </NStatistic>
               <NStatistic label="Room">
                  <NText class="block max-w-[200px] text-lg!">
                     {{ room.title }}
                  </NText>
               </NStatistic>
               <NStatistic label="Date">
                  <NText class="block max-w-[200px] text-lg!">
                     {{ timestampToDateString(monitorLog.createdAt) }}
                  </NText>
               </NStatistic>
               <NStatistic label="Time">
                  <NText class="block max-w-[200px] text-lg!">
                     {{
                        timestampToTimeString(monitorLog.createdAt, false, true)
                     }}
                  </NText>
               </NStatistic>
               <NStatistic label="Integrity Score">
                  <NText class="block max-w-[200px] text-lg!">
                     {{ (monitorLog.integrityScore * 100).toFixed(2) }}%
                  </NText>
               </NStatistic>
               <NStatistic label="Phone Detected">
                  <NText
                     :type="!monitorLog.isPhonePresent ? 'default' : 'error'"
                     class="block max-w-[200px] text-lg!"
                  >
                     {{ monitorLog.isPhonePresent ? "Yes" : "No" }}
                  </NText>
               </NStatistic>
               <NStatistic label="Warning Level">
                  <NTag
                     :type="
                        warningLevelToComponentType(monitorLog.warningLevel)
                     "
                     round
                  >
                     {{ monitorLog.warningLevel }}
                  </NTag>
               </NStatistic>
            </div>
         </template>
         <Loader
            v-if="
               store.isLoadMonitorLogLoading ||
               store.isLoadStudentLoading ||
               store.isLoadRoomLoading
            "
         />
         <NEmpty v-else-if="!monitorLog" description="Not found" size="huge" />
         <div v-else class="flex flex-wrap justify-around w-full h-full gap-8">
            <!-- feature impact grouped rank bar chart -->
            <div class="flex-1 flex items-center justify-center flex-col gap-2">
               <NText>Feature Impact Ranking</NText>
               <FeatureImpactRankChart
                  :monitorLog="monitorLog"
                  style="width: 100%; min-height: 240px"
               />
            </div>
            <div
               v-if="!monitorLog.recordingUrl"
               class="flex-1 flex items-center justify-center"
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
               class="flex-1 max-w-[calc(80vw-200px)] min-w-[320px] max-h-[calc(100vh-300px)] min-h-[230px] rounded object-contain"
               controls
               :src="monitorLog.recordingUrl"
               type="video/webm"
            ></video>
         </div>
      </NCard>
   </NModal>
</template>

<script setup lang="ts">
import { NModal, NCard, NEmpty, NStatistic, NTag, NText } from "naive-ui";
import { ref, watch } from "vue";
import { useStore } from "../composables/use-store";
import { MonitorLog, RoomInfo, StudentInfo } from "@/lib/typings";
import { useRoute, useRouter } from "vue-router";
import { PhVideoCameraSlash } from "@phosphor-icons/vue";
import { timestampToDateString, timestampToTimeString } from "@/lib/datetime";
import { warningLevelToComponentType } from "@/lib/ui";
import FeatureImpactRankChart from "./feature-impact-rank-chart.vue";
import Loader from "@/app/components/loader.vue";

const store = useStore();
const show = ref(false);
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

         // load monitor log, student, and room
         await store.loadMonitorLog(newId as string);
         const _monitorLog = store.allMonitorLogs.get(newId as string);
         if (!_monitorLog) return;
         const _student = store.allStudents.get(_monitorLog.studentId)!;
         const _room = store.allRooms.get(_monitorLog.roomId)!;
         room.value = _room;
         student.value = _student;
         monitorLog.value = _monitorLog;
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
