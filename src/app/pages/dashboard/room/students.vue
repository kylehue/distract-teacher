<template>
   <div class="flex flex-col gap-4">
      <div class="flex justify-end w-full gap-2">
         <InputSearch
            :documents="studentsArray"
            :fields="['name']"
            label-field="name"
            id-field="id"
            placeholder="Search students..."
            class="w-fit!"
            @search="
               (ids) => {
                  table?.filters({ name: ids });
               }
            "
         ></InputSearch>
      </div>
      <NDataTable
         ref="table"
         :columns="columns"
         :data="studentsArray"
         :pagination="{ pageSize: 10 }"
         :single-line="false"
         :row-class-name="(row) => (!row.active ? 'opacity-50' : '')"
      />
   </div>
</template>

<script setup lang="ts">
import {
   DataTableColumns,
   NButton,
   NDataTable,
   NPopselect,
   NTag,
   NText,
   useThemeVars,
} from "naive-ui";
import { computed, h, inject, onMounted, Ref, ref, useTemplateRef } from "vue";
import { RoomInfo, StudentInfo } from "@/lib/typings";
import { RouterLink, useRoute, useRouter } from "vue-router";
import InputSearch from "@/app/components/input-search.vue";
import { getWithDefault } from "@/lib/object";
import { useStore } from "@/app/composables/use-store";
import { renderIcon } from "@/lib/ui";
import { PhDotsThreeVertical } from "@phosphor-icons/vue";
import { compareTimestamps, timestampToTimeString } from "@/lib/datetime";
import { ROOM_INJECTION_KEY } from "@/lib/injection-keys";

const table = useTemplateRef("table");
const route = useRoute();
const store = useStore();
const theme = useThemeVars();
const room = inject(ROOM_INJECTION_KEY)!;
const students = computed(() =>
   getWithDefault(
      store.studentsGroupedByRoomId,
      room.value!.id,
      new Map() as typeof store.allStudents
   )
);
const studentsArray = computed(() => Array.from(students.value.values()));
const columns: DataTableColumns<StudentInfo> = [
   {
      title: "Student Name",
      key: "studentName",
      ellipsis: { tooltip: { placement: "bottom" } },
      render(row) {
         return h("div", { class: "flex flex-wrap items-center gap-1" }, [
            h(NText, null, { default: () => row.name }),
            !row.active
               ? h(
                    NTag,
                    { type: "default", round: true, size: "small" },
                    { default: () => "Inactive" }
                 )
               : "",
         ]);
      },
      sorter: {
         compare(rowA, rowB) {
            return (
               compareBoolean(rowB.active, rowA.active) ||
               rowA.name.localeCompare(rowB.name)
            );
         },
         multiple: 1,
      },
      defaultSortOrder: "ascend",
      filterMultiple: true,
      filter(value, row) {
         return value === row.id;
      },
   },
   {
      title: "Total Logs",
      key: "totalLogs",
      sorter: {
         compare(rowA, rowB) {
            return (
               compareBoolean(rowB.active, rowA.active) ||
               store.countMonitorLogsOfStudent(rowA.id) -
                  store.countMonitorLogsOfStudent(rowB.id)
            );
         },
         multiple: 2,
      },
      render(row) {
         return store.countMonitorLogsOfStudent(row.id);
      },
   },
   {
      title: "Time Joined",
      key: "timeJoined",
      render(row) {
         return timestampToTimeString(row.timeJoined);
      },
      sorter: {
         compare(rowA, rowB) {
            return (
               compareBoolean(rowB.active, rowA.active) ||
               compareTimestamps(rowA.timeJoined, rowB.timeJoined)
            );
         },
         multiple: 3,
      },
   },
   {
      title: "Time Left",
      key: "timeLeft",
      render(row) {
         if (!row.timeLeft) return "N/A";
         return timestampToTimeString(row.timeLeft);
      },
      sorter: {
         compare(rowA, rowB) {
            return (
               compareBoolean(rowB.active, rowA.active) ||
               compareTimestamps(rowA.timeLeft, rowB.timeLeft)
            );
         },
         multiple: 3,
      },
   },
   {
      title: "",
      key: "actions",
      width: 50,
      align: "center",
      render(row) {
         return h(
            NPopselect,
            {
               options: [
                  {
                     value: "reports",
                     label: "View Reports",
                     render({ node }: any) {
                        return h(RouterLink, { to: "" }, () => node);
                     },
                  },
                  {
                     value: "view-logs",
                     label: "View Logs",
                     render({ node }: any) {
                        return h(
                           RouterLink,
                           {
                              to: {
                                 path: "monitoring",
                                 query: { filterByStudent: row.id },
                              },
                           },
                           () => node
                        );
                     },
                  },
                  {
                     value: "ban",
                     label: "Ban",
                     style: { color: theme.value.errorColor },
                  },
               ],
               trigger: "click",
               onUpdateValue(v) {
                  console.log(v);
               },
            },
            {
               default: () =>
                  h(
                     NButton,
                     { size: "small", circle: true, tertiary: true },
                     { default: renderIcon(PhDotsThreeVertical) }
                  ),
            }
         );
      },
   },
];

function compareBoolean(a: boolean, b: boolean) {
   if (a === b) return 0;
   return a ? 1 : -1;
}

onMounted(() => {
   (window as any).$store = store;
});
</script>
