import { NIcon } from "naive-ui";
import { Component, h } from "vue";
import { RoomInfo, WarningLevel } from "./typings";

export function renderIcon(icon: Component, size = 20) {
   return () => h(NIcon, { size }, { default: () => h(icon) });
}

export function warningLevelToComponentType(level: WarningLevel) {
   let color: "success" | "warning" | "error" = "success";
   if (level === "moderate") color = "warning";
   else if (level === "severe") color = "error";
   return color;
}

export function roomStatusToComponentType(roomStatus: RoomInfo["status"]) {
   let color: "success" | "warning" | "error" = "success";
   if (roomStatus === "paused") color = "warning";
   if (roomStatus === "concluded") color = "error";

   return color;
}