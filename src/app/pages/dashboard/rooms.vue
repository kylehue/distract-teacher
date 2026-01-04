<template>
   <!-- Main -->
   <Layout title="Rooms">
      <div class="flex justify-end gap-2 mb-4">
         <InputSearch
            :documents="roomsArray"
            :fields="['title', 'code']"
            label-field="title"
            id-field="id"
            placeholder="Search rooms..."
            class="w-fit!"
            @search="
               (ids) => {
                  table?.filters({ title: ids });
               }
            "
         ></InputSearch>
      </div>
      <NDataTable
         ref="table"
         :columns="columns"
         :data="roomsArray"
         :pagination="{ pageSize: 10 }"
         :single-line="false"
         :loading="store.isLoadRoomsLoading"
      />
      <template #header-extra>
         <div class="flex flex-row gap-2">
            <NButton @click="showCreateRoomModal = true">
               Create New Room
               <template #icon><PhPlus></PhPlus></template>
            </NButton>
         </div>
      </template>
   </Layout>

   <!-- Create Room Modal -->
   <NModal v-model:show="showCreateRoomModal" closable>
      <NCard
         title="Create New Room"
         closable
         @close="showCreateRoomModal = false"
         class="w-[420px]!"
      >
         <NForm>
            <NFormItem
               label="Room Title"
               :validation-status="createRoomModalForm.titleStatus"
               :feedback="createRoomModalForm.titleFeedback"
            >
               <NInput
                  v-model:value="createRoomModalForm.title"
                  placeholder="Enter the room title"
                  :disabled="isCreateRoomLoading"
               />
            </NFormItem>

            <NFormItem
               label="Room Code"
               :validation-status="createRoomModalForm.codeStatus"
               :feedback="createRoomModalForm.codeFeedback"
            >
               <div class="flex flex-col gap-1 w-full">
                  <NInput
                     v-model:value="createRoomModalForm.code"
                     placeholder="Enter the room code"
                     :disabled="
                        createRoomModalForm.autoGenerateCode ||
                        isCreateRoomLoading
                     "
                  />
                  <NCheckbox
                     class="w-fit"
                     v-model:checked="createRoomModalForm.autoGenerateCode"
                     size="small"
                     :disabled="isCreateRoomLoading"
                  >
                     <NText depth="3" class="text-xs">
                        Auto-generate room code
                     </NText>
                  </NCheckbox>
               </div>
            </NFormItem>

            <NFormItem
               label="Student Capacity"
               :validation-status="createRoomModalForm.studentCapacityStatus"
               :feedback="createRoomModalForm.studentCapacityFeedback"
            >
               <NInputNumber
                  v-model:value="createRoomModalForm.studentCapacity"
                  placeholder="Enter the max number of students"
                  class="w-full"
                  :disabled="isCreateRoomLoading"
                  :min="0"
               />
            </NFormItem>

            <NButton
               type="primary"
               block
               class="mt-2!"
               :loading="isCreateRoomLoading"
               @click="createRoom()"
            >
               Create
            </NButton>
         </NForm>
      </NCard>
   </NModal>
</template>

<script setup lang="ts">
import { useSocket } from "@/app/composables/use-socket";
import Layout from "./layout.vue";
import { PhCopy, PhMagnifyingGlass, PhPlus } from "@phosphor-icons/vue";
import {
   NButton,
   NDataTable,
   NModal,
   NCard,
   NForm,
   NFormItem,
   NInput,
   NInputNumber,
   NCheckbox,
   NText,
   DataTableColumns,
   useMessage,
} from "naive-ui";
import InputSearch from "@/app/components/input-search.vue";
import CopyButton from "@/app/components/copy-button.vue";
import {
   computed,
   h,
   onMounted,
   reactive,
   ref,
   useTemplateRef,
   watch,
} from "vue";
import { RoomInfo } from "@/lib/typings";
import { RouterLink } from "vue-router";
import { useSocketEvent } from "@/app/composables/use-socket-event";
import { useStore } from "@/app/composables/use-store";

const message = useMessage();
const store = useStore();
const showCreateRoomModal = ref(false);
const createRoomModalForm = reactive({
   title: "",
   code: "",
   studentCapacity: 10,
   autoGenerateCode: true,
   titleFeedback: "",
   codeFeedback: "",
   studentCapacityFeedback: "",
   titleStatus: "success" as "success" | "error",
   codeStatus: "success" as "success" | "error",
   studentCapacityStatus: "success" as "success" | "error",
});

const table = useTemplateRef("table");

const columns: DataTableColumns<RoomInfo> = [
   {
      title: "Title",
      key: "title",
      ellipsis: { tooltip: { placement: "bottom" } },
      sorter: {
         compare: (a, b) => a.title.localeCompare(b.title),
         multiple: 1,
      },
      filterMultiple: true,
      filter(value, row) {
         return value === row.id;
      },
   },
   {
      title: "Code",
      key: "code",
      render(row) {
         return h(CopyButton, {
            textToCopy: row.code,
            size: "small",
            quaternary: true,
            textClass: "font-mono",
         });
      },
      ellipsis: { tooltip: { placement: "bottom" } },
      align: "center",
   },
   {
      title: "Students",
      key: "students",
      render(row) {
         return `${row.studentCount} / ${row.studentCapacity}`;
      },
      sorter: {
         compare(rowA, rowB) {
            return rowA.studentCount - rowB.studentCount;
         },
         multiple: 2,
      },
   },
   {
      title: "Status",
      key: "status",
      render(row) {
         let color: "error" | "success" = "error";
         if (row.status !== "concluded") color = "success";
         return h(
            NText,
            { type: color },
            {
               default: () =>
                  row.status !== "concluded" ? "Ongoing" : "Concluded",
            }
         );
      },
      filterOptions: [
         { label: "Ongoing", value: "ongoing" },
         { label: "Concluded", value: "concluded" },
      ],
      filter(value, row) {
         if (value === "ongoing") {
            return row.status !== "concluded";
         } else {
            return row.status === "concluded";
         }
      },
      sorter: {
         compare(rowA, rowB) {
            const statusA = rowA.status !== "concluded" ? 1 : 0;
            const statusB = rowB.status !== "concluded" ? 1 : 0;
            return statusB - statusA;
         },
         multiple: 5,
      },
   },
   {
      title: "Time Started",
      key: "timeStarted",
      render(row) {
         if (!row.timeStarted) return "N/A";
         const date = new Date(row.timeStarted);
         return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
         });
      },
      sorter: {
         compare(rowA, rowB) {
            const timeA = rowA.timeStarted || 0;
            const timeB = rowB.timeStarted || 0;
            return timeA - timeB;
         },
         multiple: 3,
      },
   },
   {
      title: "Time Ended",
      key: "timeEnded",
      render(row) {
         if (!row.timeEnded) return "N/A";
         const date = new Date(row.timeEnded);
         return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
         });
      },
      sorter: {
         compare(rowA, rowB) {
            const timeA = rowA.timeEnded || 0;
            const timeB = rowB.timeEnded || 0;
            return timeA - timeB;
         },
         multiple: 3,
      },
   },
   {
      title: "Date Created",
      key: "dateCreated",
      render(row) {
         const date = new Date(row.createdAt);
         return date.toLocaleDateString();
      },
      sorter: {
         compare(rowA, rowB) {
            return rowA.createdAt - rowB.createdAt;
         },
         multiple: 4,
      },
      defaultSortOrder: "descend",
   },
   {
      title: "Actions",
      key: "actions",
      render(row) {
         return h(RouterLink, { to: "/dashboard/rooms/" + row.id }, () =>
            h(NButton, { size: "small" }, { default: () => "View Room" })
         );
      },
   },
];

const { execute: createRoom, isLoading: isCreateRoomLoading } = useSocketEvent({
   successEvent: "teacher:create_room_success",
   errorEvent: "teacher:create_room_error",
   executeEvent: "teacher:create_room",
   onBeforeExecute() {
      createRoomModalForm.titleFeedback = "";
      createRoomModalForm.codeFeedback = "";
      createRoomModalForm.studentCapacityFeedback = "";
      createRoomModalForm.titleStatus = "success";
      createRoomModalForm.codeStatus = "success";
      createRoomModalForm.studentCapacityStatus = "success";
      return true;
   },
   onSuccess(data) {
      showCreateRoomModal.value = false;
      createRoomModalForm.title = "";
      createRoomModalForm.code = "";
      createRoomModalForm.studentCapacity = 10;
      createRoomModalForm.autoGenerateCode = true;
      message.success("Room created successfully!");
   },
   onError(errorData) {
      const fieldErrors = errorData.fieldErrors;
      if (fieldErrors.title) {
         createRoomModalForm.titleStatus = "error";
         createRoomModalForm.titleFeedback = fieldErrors.title;
      }
      if (fieldErrors.code) {
         createRoomModalForm.codeStatus = "error";
         createRoomModalForm.codeFeedback = fieldErrors.code;
      }
      if (fieldErrors.studentCapacity) {
         createRoomModalForm.studentCapacityStatus = "error";
         createRoomModalForm.studentCapacityFeedback =
            fieldErrors.studentCapacity;
      }
   },
   executePayload: () => ({
      title: createRoomModalForm.title,
      code: createRoomModalForm.code,
      autoGenerateCode: createRoomModalForm.autoGenerateCode,
      studentCapacity: createRoomModalForm.studentCapacity,
   }),
});

const roomsArray = computed(() => Array.from(store.allRooms.values()));
onMounted(() => {
   store.loadRooms();
});
</script>
