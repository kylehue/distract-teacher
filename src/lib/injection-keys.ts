import type { InjectionKey, Ref } from "vue";
import type { TeacherInfo, RoomInfo } from "@/lib/typings";
export const TEACHER_INJECTION_KEY: InjectionKey<Ref<TeacherInfo | null>> =
   Symbol("teacher-info");

export const ROOM_INJECTION_KEY: InjectionKey<Ref<RoomInfo | null>> =
   Symbol("room-info");

export const THEME_INJECTION_KEY: InjectionKey<Ref<"light" | "dark">> =
   Symbol("theme-mode");

export const LOGOUT_INJECTION_KEY: InjectionKey<{
   execute: () => Promise<void>;
   isLoading: Ref<boolean>;
}> = Symbol("logout-function");
