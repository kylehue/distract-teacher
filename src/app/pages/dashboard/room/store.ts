import { ref } from "vue";
import type { RoomInfo, RoomStudentInfo } from "@/lib/typings";

export const roomInfo = ref<RoomInfo | null>(null);
export const studentInfos = ref<RoomStudentInfo[]>([]);
export const roomId = ref<string | null>(null);
