import type { InjectionKey, Ref } from "vue";
import type {
   TeacherInfo,
   RoomInfo,
   MonitorLog,
   StudentInfo,
} from "@/lib/typings";
export const TEACHER_INJECTION_KEY: InjectionKey<Ref<TeacherInfo | null>> =
   Symbol("teacher-info");

export const ROOM_INJECTION_KEY: InjectionKey<Ref<RoomInfo | null>> =
   Symbol("room-info");

export const MONITOR_LOG_INJECTION_KEY: InjectionKey<Ref<MonitorLog | null>> =
   Symbol("monitor-log-info");

export const MONITOR_LOGS_INJECTION_KEY: InjectionKey<Ref<MonitorLog[]>> =
   Symbol("monitor-logs-info");

export const MONITOR_LOGS_MAP_INJECTION_KEY: InjectionKey<
   Ref<Map<string | number, MonitorLog>>
> = Symbol("monitor-logs-map-info");

export const STUDENT_INJECTION_KEY: InjectionKey<Ref<StudentInfo | null>> =
   Symbol("student-info");

export const STUDENTS_INJECTION_KEY: InjectionKey<Ref<StudentInfo[]>> =
   Symbol("students-info");

export const STUDENTS_MAP_INJECTION_KEY: InjectionKey<
   Ref<Map<string | number, StudentInfo>>
> = Symbol("students-map-info");

export const THEME_INJECTION_KEY: InjectionKey<Ref<"light" | "dark">> =
   Symbol("theme-mode");

export const LOGOUT_INJECTION_KEY: InjectionKey<{
   execute: () => Promise<void>;
   isLoading: Ref<boolean>;
}> = Symbol("logout-function");
