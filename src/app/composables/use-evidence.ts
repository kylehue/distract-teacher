import { computed, ref } from "vue";
import { useSocketEvent } from "./use-socket-event";
import { MonitorLog } from "@/lib/typings";

const isShowing = ref(false);

export function useEvidence() {
   const {
      execute: loadMonitorLog,
      data: monitorLogData,
      isLoading,
   } = useSocketEvent<MonitorLog>({
      executeEvent: "teacher:load_monitor_log",
      successEvent: "teacher:load_monitor_log_success",
      errorEvent: "teacher:load_monitor_log_error",
   });

   const monitorLog = computed(() => monitorLogData.value);

   function show(monitorLogId: string | number) {
      loadMonitorLog({ monitorLogId });
      isShowing.value = true;
   }

   function hide() {
      isShowing.value = false;
   }

   return { isShowing, isLoading, show, hide, monitorLog };
}
