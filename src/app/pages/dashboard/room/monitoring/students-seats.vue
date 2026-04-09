<template>
   <div class="flex flex-col gap-4 h-full">
      <div class="flex flex-wrap gap-2 w-full">
         <InputSearch
            :documents="preprocessedStudentsArray"
            :fields="['name']"
            id-field="id"
            label-field="name"
            @select="(id) => (highlightedStudent = id)"
            @update:search-query="() => (highlightedStudent = undefined)"
            class="lg:flex-1 w-full"
         />
         <NSelect
            v-model:value="timeThreshold"
            :options="TIME_THRESHOLD_OPTIONS"
            class="flex-1"
         ></NSelect>
         <NTooltip :delay="1000">
            <template #trigger>
               <NInputNumber
                  v-model:value="seatColumnCount"
                  :min="1"
                  class="flex-1"
               >
                  <template #prefix>
                     <NText :depth="3">Columns: </NText>
                  </template>
               </NInputNumber>
            </template>
            Number of columns
         </NTooltip>
         <NButton
            secondary
            @click="arrangeAlphabetically()"
            :disabled="isArrangedAlphabetically"
         >
            Arrange Alphabetically
         </NButton>
         <NButton
            secondary
            @click="saveChanges()"
            :disabled="!isColumnCountChanged && !isSeatOrdersChanged"
            :loading="patchRoom.isLoading"
         >
            Save
         </NButton>
         <NButton
            secondary
            @click="resetChanges()"
            :disabled="!isColumnCountChanged && !isSeatOrdersChanged"
         >
            Reset
         </NButton>
      </div>
      <NEmpty v-if="!preprocessedStudentsArray.length">
         Room is currently empty.
      </NEmpty>
      <div v-else class="flex flex-col gap-4">
         <Draggable
            :list="preprocessedStudentsArray"
            item-key="id"
            animation="200"
            @change="(e: any) => onChangeOrder(e.moved)"
            class="seats-container grid"
            :style="{
               'grid-template-columns': `repeat(${seatColumnCount}, minmax(0, 1fr))`,
            }"
         >
            <template #item="{ element: student }: { element: StudentInfo }">
               <NCard
                  content-class="p-0!"
                  class="seats-item"
                  :class="{
                     'seats-item-low': !!getRecentWarnings(student.id).low,
                     'seats-item-moderate': !!getRecentWarnings(student.id)
                        .moderate,
                     'seats-item-severe':
                        !!getRecentWarnings(student.id).severe ||
                        !!getRecentWarnings(student.id).phone,
                     'seats-item-highlighted':
                        highlightedStudent === student.id,
                  }"
               >
                  <div class="flex flex-col gap-2 h-full">
                     <NTooltip>
                        <template #trigger>
                           <RouterLink
                              :to="`/dashboard/student-reports/${student.id}`"
                              class="seats-item-title link truncate leading-normal text-current! w-fit"
                           >
                              <div class="flex items-center gap-1">
                                 <PhUser />
                                 <NText>{{ student.name }}</NText>
                                 <NText
                                    v-if="
                                       !student.active &&
                                       room?.status !== 'concluded'
                                    "
                                    :depth="3"
                                 >
                                    (Inactive)
                                 </NText>
                              </div>
                           </RouterLink>
                        </template>
                        {{ student.name }}
                     </NTooltip>
                     <div class="flex gap-1">
                        <NText class="text-xs! font-normal!" :depth="3">
                           Avg. Integrity Score:
                        </NText>
                        <NText class="text-xs! font-normal!" :depth="2">
                           {{
                              student.monitorLogCount
                                 ? (
                                      (student.integrityScoreSum /
                                         student.monitorLogCount) *
                                      100
                                   ).toFixed(2)
                                 : "0.00"
                           }}%
                        </NText>
                     </div>
                     <!-- Video of students should show up here -->
                     <VideoTile
                        :video-track="mappedParticipants[student.uuid]?.track"
                     />
                     <NDivider class="m-0!">
                        <NText class="text-xs! font-normal!" :depth="3">
                           Recent Warnings
                        </NText>
                     </NDivider>
                     <div
                        v-if="!hasRecentWarnings(student.id)"
                        class="flex justify-center w-full"
                     >
                        <NText
                           class="seats-info text-center leading-tight"
                           :depth="3"
                        >
                           No recent warnings
                        </NText>
                     </div>
                     <div v-else class="flex flex-col">
                        <template
                           v-for="level in LEVELS"
                           :key="student.id + '_' + level"
                        >
                           <div
                              v-if="getRecentWarnings(student.id)[level]"
                              class="flex items-center gap-1"
                           >
                              <PhDeviceMobile
                                 v-if="level === 'phone'"
                                 class="text-error"
                              />
                              <div
                                 v-else
                                 class="dot"
                                 :class="'bg-' + level"
                              ></div>
                              <NTooltip>
                                 <template #trigger>
                                    <RouterLink
                                       :to="{
                                       query: {
                                          monitorLogId: getRecentWarnings(
                                             student.id,
                                          )[level]!.id,
                                       },
                                    }"
                                       class="link text-center truncate"
                                    >
                                       <NText class="seats-info" :depth="3">
                                          {{
                                             moment(
                                                getRecentWarnings(student.id)[
                                                   level
                                                ]!.createdAt,
                                             ).fromNow()
                                          }}
                                       </NText>
                                    </RouterLink>
                                 </template>
                                 Detected a
                                 {{
                                    level === "phone"
                                       ? "phone"
                                       : `${level} warning level`
                                 }}
                                 on
                                 {{
                                    moment(
                                       getRecentWarnings(student.id)[level]!
                                          .createdAt,
                                    ).format("MMMM DD, YYYY [at] hh:mm:ss A")
                                 }}
                              </NTooltip>
                           </div>
                        </template>
                     </div>
                  </div>
               </NCard>
            </template>
         </Draggable>
         <NDivider class="m-0!" />
         <NCard class="flex flex-col sm:w-fit!" title="Legend">
            <div class="flex items-center gap-1">
               <div class="dot bg-low"></div>
               Low Warning Level Detected
            </div>
            <div class="flex items-center gap-1">
               <div class="dot bg-moderate"></div>
               Moderate Warning Level Detected
            </div>
            <div class="flex items-center gap-1">
               <div class="dot bg-severe"></div>
               Severe Warning Level Detected
            </div>
            <div class="flex items-center gap-1">
               <PhDeviceMobile class="text-error" />
               Phone Detected
            </div>
         </NCard>
      </div>
   </div>
</template>

<script setup lang="ts">
import {
   NButton,
   useThemeVars,
   NText,
   NCard,
   NTooltip,
   NSelect,
   NInputNumber,
   NEmpty,
   NDivider,
} from "naive-ui";
import {
   computed,
   inject,
   onBeforeUnmount,
   onMounted,
   ref,
   triggerRef,
   watch,
} from "vue";
import { MonitorLog, StudentInfo } from "@/lib/typings";
import { RouterLink } from "vue-router";
import {
   MONITOR_LOGS_INJECTION_KEY,
   ROOM_INJECTION_KEY,
   STUDENTS_INJECTION_KEY,
} from "@/lib/injection-keys";
import moment from "moment";
import { PhDeviceMobile, PhUser } from "@phosphor-icons/vue";
import InputSearch from "@/app/components/input-search.vue";
import Draggable from "vuedraggable";
import { useFetch } from "@/app/composables/use-fetch";
import { Participant, useLiveKit } from "@/app/composables/use-live-kit";
import VideoTile from "@/app/components/video-tile.vue";

const themeVars = useThemeVars();
const patchRoom = useFetch("/api/rooms/:roomId", "PATCH");
const room = inject(ROOM_INJECTION_KEY)!;
const studentsArray = inject(STUDENTS_INJECTION_KEY)!;
const monitorLogsArray = inject(MONITOR_LOGS_INJECTION_KEY)!;
const liveKit = useLiveKit();

const LEVELS = ["low", "moderate", "severe", "phone"] as const;
const TIME_THRESHOLD_OPTIONS = [
   { label: "Last 15 minutes", value: 1000 * 60 * 15 },
   { label: "Last 30 minutes", value: 1000 * 60 * 30 },
   { label: "Last hour", value: 1000 * 60 * 60 },
   { label: "Show all recent warnings", value: Infinity },
];

const timeThreshold = ref(TIME_THRESHOLD_OPTIONS[0].value);
const seatColumnCount = ref(room.value?.seatColumnCount ?? 4);
const highlightedStudent = ref<string>();
const currentSeatOrders = ref(
   room.value?.seatOrders ? { ...room.value.seatOrders } : {},
);

const mappedParticipants = computed(() => {
   const map: Record<string, Participant> = {};
   for (const participant of liveKit.participants.value) {
      map[participant.identity] = participant as Participant;
   }
   return map;
});
const preprocessedStudentsArray = computed(() => {
   return studentsArray.value
      .filter((student) => student.permitted)
      .sort((a, b) => {
         return currentSeatOrders.value[a.id] - currentSeatOrders.value[b.id];
      });
});
const recentWarningsPerStudent = computed(() => {
   const result: Record<
      string,
      {
         low?: MonitorLog;
         moderate?: MonitorLog;
         severe?: MonitorLog;
         phone?: MonitorLog;
      }
   > = {};
   for (const log of monitorLogsArray.value) {
      let latestLogsPerLevel = result[log.studentId];
      if (!latestLogsPerLevel) {
         latestLogsPerLevel = {
            low: undefined,
            moderate: undefined,
            severe: undefined,
            phone: undefined,
         };
         result[log.studentId] = latestLogsPerLevel;
      }
      if (log.warningLevel === "none") continue;
      if (moment().diff(log.createdAt) > timeThreshold.value) {
         continue;
      }

      // fight for latest (per warning level)
      let latestLog = latestLogsPerLevel[log.warningLevel];
      if (!latestLog) {
         latestLogsPerLevel[log.warningLevel] = log;
      } else if (moment(latestLog.createdAt).diff(log.createdAt) < 0) {
         latestLogsPerLevel[log.warningLevel] = log;
      }

      // fight for latest (detected phones)
      if (log.isPhonePresent) {
         let latestLogForPhone = latestLogsPerLevel["phone"];
         if (!latestLogForPhone) {
            latestLogsPerLevel["phone"] = log;
         } else if (
            moment(latestLogForPhone.createdAt).diff(log.createdAt) < 0
         ) {
            latestLogsPerLevel["phone"] = log;
         }
      }
   }

   return result;
});
const isSeatOrdersChanged = computed(() => {
   if (!room.value) return false;
   if (!currentSeatOrders.value) return false;
   if (!Object.values(currentSeatOrders.value).length) return false;
   for (const student of preprocessedStudentsArray.value) {
      if (
         (room.value.seatOrders[student.id] ?? Infinity) !==
         currentSeatOrders.value[student.id]
      ) {
         return true;
      }
   }
   return false;
});
const isColumnCountChanged = computed(() => {
   return room.value?.seatColumnCount !== seatColumnCount.value;
});
const isArrangedAlphabetically = computed(() => {
   const sorted = getAlphabeticalOrder();
   for (let i = 0; i < sorted.length; i++) {
      if (currentSeatOrders.value[sorted[i].id] !== i) {
         return false;
      }
   }
   return true;
});

function getRecentWarnings(studentId: string) {
   return (
      recentWarningsPerStudent.value[studentId] ?? {
         low: undefined,
         moderate: undefined,
         severe: undefined,
         phone: undefined,
      }
   );
}

function hasRecentWarnings(studentId: string) {
   const recentWarnings = getRecentWarnings(studentId);
   return (
      !!recentWarnings.low ||
      !!recentWarnings.moderate ||
      !!recentWarnings.severe ||
      !!recentWarnings.phone
   );
}

function onChangeOrder(item: {
   newIndex: number;
   oldIndex: number;
   element: StudentInfo;
}) {
   setOrder(item.newIndex, item.element.id);
}

function setOrder(newOrder: number, studentId: string) {
   // Build normalized list
   const ordered = preprocessedStudentsArray.value
      .map((s) => ({
         id: s.id,
         order: currentSeatOrders.value[s.id],
      }))
      .sort((a, b) => {
         const ao = a.order ?? Infinity;
         const bo = b.order ?? Infinity;
         return ao - bo;
      });

   // Ensure deterministic order even if duplicates/undefined exist
   const ids = ordered.map((s) => s.id);

   const currentIndex = ids.indexOf(studentId);
   if (currentIndex === -1) return;

   ids.splice(currentIndex, 1);

   const targetIndex = Math.max(0, Math.min(newOrder, ids.length));

   ids.splice(targetIndex, 0, studentId);

   // Reassign clean sequential orders
   ids.forEach((id, index) => {
      currentSeatOrders.value[id] = index;
   });
}

function resetChanges() {
   if (!room.value) return;
   seatColumnCount.value = room.value.seatColumnCount ?? 8;
   currentSeatOrders.value = room.value.seatOrders
      ? { ...room.value.seatOrders }
      : {};
}

function saveChanges() {
   if (!room.value) return;
   patchRoom.execute({
      body: {
         seatOrders: currentSeatOrders.value,
         seatColumnCount: seatColumnCount.value,
      },
      params: {
         roomId: room.value.id,
      },
   });
}

function getAlphabeticalOrder() {
   return preprocessedStudentsArray.value
      .slice(0)
      .sort((a, b) => a.name.localeCompare(b.name));
}

function arrangeAlphabetically() {
   getAlphabeticalOrder().forEach((student, index) => {
      currentSeatOrders.value[student.id] = index;
   });
}

watch(
   () => [
      room.value?.code,
      room.value?.status,
      preprocessedStudentsArray.value.length,
   ],
   () => {
      // TODO: temporarily disable to save bandwidth
      if (
         room.value &&
         room.value.status === "monitoring" &&
         preprocessedStudentsArray.value.length
      ) {
         liveKit.connect(room.value.code);
      } else {
         liveKit.disconnect();
      }
   },
   {
      immediate: true,
   },
);
</script>

<style scoped>
.dot {
   width: 1em;
   height: 1em;
   flex: none;
   position: relative;
}

.dot::after {
   content: "";
   --size: 0.5em;
   position: absolute;
   inset: 0;
   margin: auto;
   width: var(--size);
   height: var(--size);
   border-radius: var(--size);
}

.dot.bg-low::after {
   background-color: v-bind("themeVars.successColor");
}

.dot.bg-moderate::after {
   background-color: v-bind("themeVars.warningColor");
}

.dot.bg-severe::after {
   background-color: v-bind("themeVars.errorColor");
}

.text-error {
   color: v-bind("themeVars.errorColor");
}

.seats-container {
   container-type: inline-size;
   gap: 0.5cqw;
}

.seats-item {
   padding: 0.5cqw;
   container-type: inline-size;
}

.seats-item-low {
   border: 1px solid v-bind("themeVars.successColor");
}

.seats-item-moderate {
   border: 1px solid v-bind("themeVars.warningColor");
}

.seats-item-severe {
   border: 1px solid v-bind("themeVars.errorColor");
}

.seats-item-low .seats-item-title {
   color: v-bind("themeVars.successColor");
}

.seats-item-moderate .seats-item-title {
   color: v-bind("themeVars.warningColor");
}

.seats-item-severe .seats-item-title {
   color: v-bind("themeVars.errorColor");
}

.seats-container:has(.seats-item-highlighted)
   .seats-item:not(.seats-item-highlighted) {
   opacity: 0.25;
}
</style>
