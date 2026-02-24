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
            <MonitorLogItem
               :monitorLog="monitorLog"
               :student="student"
               :room="room"
            />
         </template>
         <Loader v-if="store.isLoadMonitorLogLoading" />
         <NEmpty
            v-else-if="!monitorLog || !student || !room"
            description="Not found"
         />
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
               <NEmpty align="center" class="max-w-[300px]">
                  <template #icon><PhVideoCameraSlash /></template>
                  <template #default>
                     <div class="flex flex-col gap-2">
                        <NText>
                           Recording is either unavailable or still being
                           processed. Please try again later.
                        </NText>
                        <NText class="text-xs" :depth="3">
                           Note: Only logs with
                           {{ room.evidenceWarningLevel }} warning level (or
                           higher) have recordings. You can modify this
                           threshold in the room settings.
                        </NText>
                     </div>
                  </template>
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
import { NModal, NCard, NEmpty, NText } from "naive-ui";
import { ref, watch } from "vue";
import { useStore } from "../composables/use-store";
import { MonitorLog, RoomInfo, StudentInfo } from "@/lib/typings";
import { useRoute, useRouter } from "vue-router";
import { PhVideoCameraSlash } from "@phosphor-icons/vue";
import FeatureImpactRankChart from "./feature-impact-rank-chart.vue";
import Loader from "@/app/components/loader.vue";
import MonitorLogItem from "./monitor-log-item.vue";

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
         monitorLog.value = undefined;
         student.value = undefined;
         room.value = undefined;
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
