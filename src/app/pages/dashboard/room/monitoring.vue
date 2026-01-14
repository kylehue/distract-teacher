<template>
   <template v-if="!room">Nothing</template>
   <div v-else class="flex flex-col gap-4">
      <div class="flex flex-row justify-end gap-2">
         <NButton
            v-if="!!room.timeStarted && room.status !== 'concluded'"
            type="error"
            tertiary
            @click="stopMonitoring()"
            :loading="patchStopMonitoring.isLoading"
         >
            Stop Monitoring
            <template #icon>
               <PhStop />
            </template>
         </NButton>
         <NButton
            v-if="room.status === 'paused'"
            type="success"
            secondary
            @click="startMonitoring()"
            :loading="patchStartMonitoring.isLoading"
         >
            {{ !!room.timeStarted ? "Continue" : "Start" }} Monitoring
            <template #icon>
               <PhPlay />
            </template>
         </NButton>
         <NButton
            v-if="room.status === 'monitoring'"
            type="warning"
            ghost
            @click="pauseMonitoring()"
            :loading="patchPauseMonitoring.isLoading"
         >
            Pause Monitoring
            <template #icon>
               <PhPause />
            </template>
         </NButton>
      </div>
      <NDataTable
         :columns="columns"
         :data="Array.from(monitorLogs?.values() ?? [])"
         :pagination="{ pageSize: 10 }"
         :single-line="false"
         :row-class-name="
            (row) => (!students.get(row.studentId)?.active ? 'opacity-50' : '')
         "
      />
   </div>
</template>

<script setup lang="ts">
import {
   DataTableBaseColumn,
   DataTableColumns,
   NButton,
   NDataTable,
   NTag,
   NText,
   useMessage,
} from "naive-ui";
import { computed, h, inject, onMounted, reactive, Ref, ref, watch } from "vue";
import { MonitorLog, RoomInfo } from "@/lib/typings";
import { PhPause, PhPlay, PhStop } from "@phosphor-icons/vue";
import { RouterLink, useRoute } from "vue-router";
import { renderIcon } from "@/lib/ui";
import FilterMenuMultiselect from "@/app/components/filter-menu-multiselect.vue";
import { useStore } from "@/app/composables/use-store";
import { useFetch } from "@/app/composables/use-fetch";

const route = useRoute();
const message = useMessage();
const store = useStore();
const filteredStudentIds = ref<(string | number)[]>([]);
const room = inject<Ref<RoomInfo>>("room")!;
const students = computed(
   () =>
      store.studentsGroupedByRoomId.get(room.value.id || "") ||
      (new Map() as typeof store.allStudents)
);
const monitorLogs = computed(
   () =>
      store.monitorLogsGroupedByRoomId.get(room.value?.id || "") ||
      (new Map() as typeof store.allMonitorLogs)
);

const columns: DataTableColumns<MonitorLog> = [
   reactive({
      title: "Student Name",
      key: "studentName",
      render(row) {
         let student = students.value.get(row.studentId);
         return h("div", { class: "flex flex-wrap items-center gap-1" }, [
            h(NText, null, {
               default: () => student?.name || "<Unnamed>",
            }),
            !student?.active
               ? h(
                    NTag,
                    { type: "error", round: true, size: "small" },
                    { default: () => "Out of room" }
                 )
               : "",
         ]);
      },
      filterMultiple: true,
      renderFilterMenu({ hide }) {
         return h(FilterMenuMultiselect, {
            class: "w-[200px]!",
            placeholder: "Filter students",
            placement: "right-start",
            options: Array.from(students.value.values()).map((s) => ({
               label: s.name,
               value: s.id,
            })),
            value: filteredStudentIds.value,
            onConfirm(data) {
               filterByStudentIds(data);
               hide();
            },
            onClear() {
               filterByStudentIds([]);
               hide();
            },
         });
      },
      filter(value, row) {
         return value === row.studentId;
      },
      sorter: {
         compare(rowA, rowB) {
            const studentA = students.value.get(rowA.studentId);
            const studentB = students.value.get(rowB.studentId);
            if (!studentA || !studentB) return 0;
            return studentA.name.localeCompare(studentB.name);
         },
         multiple: 1,
      },
   }),
   {
      title: "Warning Level",
      key: "warningLevel",
      render(row) {
         let color: "default" | "warning" | "error" = "default";
         if (row.warningLevel === "moderate") color = "warning";
         else if (row.warningLevel === "severe") color = "error";
         return h(
            NTag,
            { type: color, round: true },
            { default: () => row.warningLevel }
         );
      },
      filterOptions: [
         {
            label: "Low",
            value: "low",
         },
         {
            label: "Moderate",
            value: "moderate",
         },
         {
            label: "Severe",
            value: "severe",
         },
      ],
      filterMultiple: true,
      filter(value, row) {
         return row.warningLevel === value;
      },
      sorter: {
         compare(rowA, rowB) {
            const levels = { low: 1, moderate: 2, severe: 3 };
            return levels[rowA.warningLevel] - levels[rowB.warningLevel];
         },
         multiple: 3,
      },
   },
   {
      title: "Time",
      key: "time",
      render(row) {
         const date = new Date(row.createdAt);
         return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
         });
      },
      sorter: {
         compare(rowA, rowB) {
            return rowA.createdAt - rowB.createdAt;
         },
         multiple: 2,
      },
      defaultSortOrder: "descend",
   },
   {
      title: "",
      key: "actions",
      width: 120,
      align: "center",
      render(row) {
         return h(
            RouterLink,
            { to: { query: { monitorLogId: row.id } } },
            {
               default: () =>
                  h(
                     NButton,
                     { size: "small", tertiary: true },
                     { default: () => "View Evidence" }
                  ),
            }
         );
      },
   },
];

const patchStartMonitoring = useFetch("/api/start_monitoring/:roomId", "PATCH");

async function startMonitoring() {
   try {
      await patchStartMonitoring.execute({
         params: { roomId: route.params.roomId },
      });

      message.success("Monitoring has started.", {
         icon: renderIcon(PhPlay),
      });
   } catch (error: any) {
      message.error(error.message);
   }
}

const patchPauseMonitoring = useFetch("/api/pause_monitoring/:roomId", "PATCH");

async function pauseMonitoring() {
   try {
      await patchPauseMonitoring.execute({
         params: { roomId: route.params.roomId },
      });

      message.warning("Monitoring has been paused.", {
         icon: renderIcon(PhPause),
      });
   } catch (error: any) {
      message.error(error.message);
   }
}

const patchStopMonitoring = useFetch("/api/stop_monitoring/:roomId", "PATCH");

async function stopMonitoring() {
   let confirmed = confirm(
      "Are you sure you want to stop monitoring? This will conclude and archive the room session. This action cannot be undone."
   );
   if (!confirmed) {
      return;
   }

   try {
      await patchStopMonitoring.execute({
         params: { roomId: route.params.roomId },
      });

      message.error("Monitoring has been stopped.", {
         icon: renderIcon(PhStop),
      });
   } catch (error: any) {
      message.error(error.message);
   }
}

function filterByStudentIds(ids: (string | number)[]) {
   const studentNameColumn = columns.find(
      (col) => (col as any).key === "studentName"
   ) as DataTableBaseColumn<MonitorLog>;
   filteredStudentIds.value = ids;
   studentNameColumn.filterOptionValues = ids;
}

onMounted(() => {
   if (route.query.filterByStudent) {
      filteredStudentIds.value = [Number(route.query.filterByStudent)];
      filterByStudentIds(filteredStudentIds.value);
   }
});
</script>
