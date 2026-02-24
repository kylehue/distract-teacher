<template>
   <div class="flex flex-col gap-2">
      <NText class="flex items-center gap-1">
         <PhUser size="14" />
         <RouterLink
            :to="`/dashboard/student-reports/${student.id}`"
            class="link"
         >
            {{ student.name }}
         </RouterLink>
      </NText>
      <div class="flex flex-wrap gap-x-12 gap-y-4">
         <Statistic title="Integrity Score">
            <template #icon>
               <PhChartLine />
            </template>
            {{ (monitorLog.integrityScore * 100).toFixed(2) + "%" }}
         </Statistic>
         <Statistic title="Warning Level">
            <NTag
               :type="warningLevelToComponentType(monitorLog.warningLevel)"
               :bordered="false"
               size="small"
            >
               {{ toTitleCase(monitorLog.warningLevel) }}
            </NTag>
         </Statistic>
         <Statistic
            title="Phone Detected"
            :value-props="{
               type: monitorLog.isPhonePresent ? 'error' : undefined,
            }"
         >
            <template #icon>
               <NText :type="monitorLog.isPhonePresent ? 'error' : undefined">
                  <PhDeviceMobile v-if="monitorLog.isPhonePresent" />
                  <PhDeviceMobileSlash v-else />
               </NText>
            </template>
            {{ monitorLog.isPhonePresent ? "Yes" : "No" }}
         </Statistic>
      </div>
      <div class="flex items-end flex-wrap gap-2">
         <NText :depth="3" class="text-xs flex items-center gap-1">
            <PhHouse size="14" />
            <RouterLink :to="`/dashboard/rooms/${room.id}`" class="link">
               {{ room.title }}
            </RouterLink>
         </NText>
         <NText :depth="3" class="text-xs flex items-center gap-1">
            <PhClock size="14" />
            <Timestamp prefix="Detected" :value="monitorLog.createdAt" />
         </NText>
         <div v-if="!!$slots.action" class="ml-auto">
            <slot name="action"></slot>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { NTag, NText } from "naive-ui";
import { MonitorLog, RoomInfo, StudentInfo } from "@/lib/typings";
import {
   PhChartLine,
   PhClock,
   PhDeviceMobile,
   PhDeviceMobileSlash,
   PhHouse,
   PhUser,
} from "@phosphor-icons/vue";
import { warningLevelToComponentType } from "@/lib/ui";
import Statistic from "./statistic.vue";
import { toTitleCase } from "@/lib/string";
import Timestamp from "./timestamp.vue";

const props = defineProps<{
   monitorLog: MonitorLog;
   student: StudentInfo;
   room: RoomInfo;
}>();
</script>
