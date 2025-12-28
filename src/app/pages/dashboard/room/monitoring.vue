<template>
   <template v-if="!roomInfo">Nothing</template>
   <div v-else class="flex flex-col gap-4">
      <div class="flex flex-row justify-end gap-2">
         <NButton
            v-if="!!roomInfo.timeStarted && roomInfo.status !== 'concluded'"
            type="error"
            tertiary
            @click="stopMonitoring()"
            :loading="isStopMonitoringLoading"
         >
            Stop Monitoring
            <template #icon>
               <PhStop />
            </template>
         </NButton>
         <NButton
            v-if="roomInfo.status === 'paused'"
            type="success"
            secondary
            @click="startMonitoring()"
            :loading="isStartMonitoringLoading"
         >
            {{ !!roomInfo.timeStarted ? "Continue" : "Start" }} Monitoring
            <template #icon>
               <PhPlay />
            </template>
         </NButton>
         <NButton
            v-if="roomInfo.status === 'monitoring'"
            type="warning"
            ghost
            @click="pauseMonitoring()"
            :loading="isPauseMonitoringLoading"
         >
            Pause Monitoring
            <template #icon>
               <PhPause />
            </template>
         </NButton>
      </div>
      <NDataTable
         :columns="columns"
         :data="data"
         :pagination="{ pageSize: 10 }"
         :single-line="false"
      />
   </div>
</template>

<script setup lang="ts">
import {
   DataTableColumns,
   NButton,
   NDataTable,
   NTag,
   useMessage,
} from "naive-ui";
import Layout from "./layout.vue";
import { h, ref } from "vue";
import { MonitoringRecord } from "@/lib/typings";
import { PhPause, PhPlay, PhStop } from "@phosphor-icons/vue";
import { useRoute } from "vue-router";
import { renderIcon } from "@/lib/ui";
import { useSocketEvent } from "@/app/composables/use-socket.event";
import { roomInfo } from "./store";

const route = useRoute();
const message = useMessage();

const columns: DataTableColumns<MonitoringRecord> = [
   {
      title: "Student Name",
      key: "studentName",
   },
   {
      title: "Warning Level",
      key: "warningLevel",
      render(row) {
         let color: "default" | "warning" | "error" = "default";
         if (row.warningLevel === "moderate") color = "warning";
         else if (row.warningLevel === "severe") color = "error";
         return h(NTag, { type: color }, { default: () => row.warningLevel });
      },
   },
   {
      title: "Time",
      key: "time",
      render(row) {
         const date = new Date(row.time);
         return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
         });
      },
   },
   {
      title: "Actions",
      key: "actions",
      render() {
         return h(
            NButton,
            {
               size: "small",
               onClick: () => {},
            },
            { default: () => "View Record" }
         );
      },
   },
];

const data = ref<MonitoringRecord[]>([]);

const { execute: startMonitoring, isLoading: isStartMonitoringLoading } =
   useSocketEvent({
      successEvent: "teacher:start_monitoring_success",
      errorEvent: "teacher:start_monitoring_error",
      executeEvent: "teacher:start_monitoring",
      executePayload: { roomId: route.params.roomId },
      onSuccess(data) {
         roomInfo.value = data.room;
         message.success("Monitoring has started.", {
            icon: renderIcon(PhPlay),
         });
      },
      onError(errorData) {
         message.error(errorData.message);
      },
   });

const { execute: pauseMonitoring, isLoading: isPauseMonitoringLoading } =
   useSocketEvent({
      successEvent: "teacher:pause_monitoring_success",
      errorEvent: "teacher:pause_monitoring_error",
      executeEvent: "teacher:pause_monitoring",
      executePayload: { roomId: route.params.roomId },
      onSuccess(data) {
         roomInfo.value = data.room;
         message.warning("Monitoring has been paused.", {
            icon: renderIcon(PhPause),
         });
      },
      onError(errorData) {
         message.error(errorData.message);
      },
   });

const { execute: stopMonitoring, isLoading: isStopMonitoringLoading } =
   useSocketEvent({
      successEvent: "teacher:stop_monitoring_success",
      errorEvent: "teacher:stop_monitoring_error",
      executeEvent: "teacher:stop_monitoring",
      executePayload: { roomId: route.params.roomId },
      onSuccess(data) {
         roomInfo.value = data.room;
         message.error("Monitoring has been stopped.", {
            icon: renderIcon(PhStop),
         });
      },
      onError(errorData) {
         message.error(errorData.message);
      },
      onBeforeExecute() {
         return confirm(
            "Are you sure you want to stop monitoring? This will conclude and archive the room session. This action cannot be undone."
         );
      },
   });
</script>
