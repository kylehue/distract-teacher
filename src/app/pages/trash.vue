<template>
   <template v-if="auth.isLoading">
      <div class="flex items-center justify-center w-full h-full gap-2">
         <NSpin />
         <NText>Loading trash...</NText>
      </div>
   </template>
   <template v-else-if="!auth.teacher">Nothing</template>
   <NLayout v-else class="w-full h-full" embedded>
      <NLayoutContent
         class="w-full h-full"
         content-class="flex flex-col p-8"
         embedded
      >
         <div class="flex flex-row items-center gap-2 mb-8">
            <NButton circle quaternary @click="$router.back()">
               <template #icon>
                  <PhArrowLeft />
               </template>
            </NButton>
            <NText strong class="text-lg"> Trash </NText>
         </div>
         <NDivider class="m-0!" />
         <div class="flex flex-col h-full">
            <div class="w-full h-4 flex-none"></div>
            <div class="flex flex-col gap-4">
               <NDataTable
                  ref="table"
                  :columns="columns"
                  :data="roomsArray"
                  :pagination="{ pageSize: 10 }"
                  :single-line="false"
                  :loading="store.isLoadDeletedRoomsLoading"
                  :scroll-x="900"
               />
            </div>
            <div class="w-full h-8 flex-none"></div>
         </div>
      </NLayoutContent>
   </NLayout>
</template>

<script setup lang="ts">
import {
   DataTableColumns,
   NButton,
   NDataTable,
   NDivider,
   NForm,
   NFormItem,
   NInput,
   NLayout,
   NLayoutContent,
   NSpin,
   NText,
   useMessage,
} from "naive-ui";
import { RoomInfo, TeacherInfo } from "@/lib/typings";
import {
   computed,
   h,
   inject,
   nextTick,
   onMounted,
   reactive,
   ref,
   Ref,
} from "vue";
import { RouterLink } from "vue-router";
import { useFetch } from "@/app/composables/use-fetch";
import { useStore } from "@/app/composables/use-store";
import { PhArrowLeft } from "@phosphor-icons/vue";
import { useAuthStore } from "../composables/use-auth-store";
import { UnauthorizedError } from "@/lib/errors";
import { timestampToDateString, compareTimestamps } from "@/lib/datetime";

const auth = useAuthStore();
const store = useStore();
const message = useMessage();
const patchRestoreRoom = useFetch("/api/rooms/:roomId/restore", "PATCH");

const columns: DataTableColumns<RoomInfo> = reactive([
   {
      title: "Title",
      key: "title",
      ellipsis: { tooltip: { placement: "bottom" } },
      sorter: {
         compare: (a, b) => a.title.localeCompare(b.title),
         multiple: 1,
      },
   },
   {
      title: "Code",
      key: "code",
      render(row) {
         return h(
            NText,
            {
               class: "font-mono",
            },
            { default: () => row.code },
         );
      },
      ellipsis: { tooltip: { placement: "bottom" } },
      align: "center",
   },
   {
      title: "Date Created",
      key: "dateCreated",
      render(row) {
         return timestampToDateString(row.createdAt);
      },
      sorter: {
         compare(rowA, rowB) {
            return compareTimestamps(rowA.createdAt, rowB.createdAt);
         },
         multiple: 2,
      },
   },
   {
      title: "Date Deleted",
      key: "dateDeleted",
      render(row) {
         return timestampToDateString(row.deletedAt!);
      },
      sorter: {
         compare(rowA, rowB) {
            return compareTimestamps(rowA.deletedAt, rowB.deletedAt);
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
      fixed: "right",
      render(row) {
         return h(
            NButton,
            {
               size: "small",
               tertiary: true,
               loading: patchRestoreRoom.isLoading,
               onClick: () => restoreRoom(row.id),
            },
            { default: () => "Restore" },
         );
      },
   },
]);

async function restoreRoom(roomId: string) {
   try {
      await patchRestoreRoom.execute({ params: { roomId } });

      message.success("Room restored successfully.");
   } catch {
      message.error(
         patchRestoreRoom.error?.message || "Failed to restore room.",
      );
   }
}

const roomsArray = computed(() => {
   return Array.from(store.deletedRooms.values());
});
onMounted(async () => {
   try {
      await auth.loginWithCookie();
      await store.loadDeletedRooms();
   } catch {
      throw new UnauthorizedError();
   }
});
</script>
