import { ref } from "vue";
import type { MonitorLog, RoomInfo, RoomStudentInfo } from "@/lib/typings";

export const roomInfo = ref<RoomInfo | null>(null);
export const studentInfos = ref<Map<string | number, RoomStudentInfo>>(
   new Map()
);
export const monitorLogs = ref<Map<string | number, MonitorLog>>(new Map());
