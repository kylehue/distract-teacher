import type { InjectionKey, Ref } from "vue";
import type { TeacherInfo, RoomInfo, MonitorLog } from "@/lib/typings";
export const TEACHER_INJECTION_KEY: InjectionKey<Ref<TeacherInfo | null>> =
   Symbol("teacher-info");

export const ROOM_INJECTION_KEY: InjectionKey<Ref<RoomInfo | null>> =
   Symbol("room-info");

export const MONITOR_LOG_INJECTION_KEY: InjectionKey<Ref<MonitorLog | null>> =
   Symbol("monitor-log-info");

export const MONITOR_LOGS_INJECTION_KEY: InjectionKey<Ref<MonitorLog[]>> =
   Symbol("monitor-log-info");

export const THEME_INJECTION_KEY: InjectionKey<Ref<"light" | "dark">> =
   Symbol("theme-mode");

export const LOGOUT_INJECTION_KEY: InjectionKey<{
   execute: () => Promise<void>;
   isLoading: Ref<boolean>;
}> = Symbol("logout-function");
