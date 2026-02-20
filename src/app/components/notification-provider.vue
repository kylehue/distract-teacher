<template>
   <NModal v-model:show="isShowing" closable>
      <NCard
         title="Notifications"
         closable
         @close="hide"
         class="w-[560px]! max-w-[calc(100vw-2rem)]"
      >
         <template #header-extra>
            <div class="flex items-center gap-2">
               <NButton
                  v-if="store.countUnreadNotifications() > 0"
                  size="tiny"
                  secondary
                  :loading="patchNotifications.isLoading"
                  @click="markAllAsRead"
               >
                  Mark All as Read
               </NButton>
               <NButton
                  v-if="notifications.length > 0"
                  size="tiny"
                  tertiary
                  type="error"
                  :loading="deleteNotifications.isLoading"
                  @click="clearAll"
               >
                  Clear
               </NButton>
            </div>
         </template>

         <DataView
            :items="notifications"
            :item-key="(item) => item.id"
            :search="{
               fields: ['title', 'body'],
               idField: 'id',
               labelField: 'title',
               maxSuggestions: 10,
            }"
            :loading="store.isLoadNotificationsLoading"
            max-height="350px"
            content-class="flex flex-col gap-0"
         >
            <template #empty>
               <NEmpty description="You have no notifications.">
                  <template #icon>
                     <PhBellZ />
                  </template>
               </NEmpty>
            </template>
            <template #item="{ item, localIndex }">
               <NDivider v-if="localIndex !== 0" class="m-0!" />
               <RowCard
                  :title="item.title"
                  :content="item.body"
                  :footer="timestampToDateString(item.createdAt, true)"
                  :tags="[
                     {
                        label: item.isRead ? 'Read' : 'Unread',
                        type: item.isRead ? 'default' : 'info',
                     },
                  ]"
                  content-class="px-0! py-2!"
                  @click="
                     () => {
                        if (!item.isRead) markAsRead(item.id);
                     }
                  "
                  :menu-options="[
                     {
                        label: 'View link',
                        disabled: !item.url,
                        to: item.url,
                     },
                     {
                        label: `Mark as ${item.isRead ? 'Unread' : 'Read'}`,
                        disabled: patchNotification.isLoading,
                        onSelect() {
                           if (item.isRead) {
                              markAsUnread(item.id);
                           } else {
                              markAsRead(item.id);
                           }
                        },
                     },
                     {
                        label: 'Delete',
                        labelProps: { type: 'error' },
                        disabled: deleteNotification.isLoading,
                        onSelect() {
                           deleteNotif(item.id);
                        },
                     },
                  ]"
               >
                  <template #icon>
                     <PhBell />
                  </template>
               </RowCard>
            </template>
         </DataView>
      </NCard>
   </NModal>
</template>

<script setup lang="ts">
import { NButton, NCard, NDivider, NModal, NEmpty, useMessage } from "naive-ui";
import { computed, onMounted } from "vue";
import { PhBell, PhBellZ } from "@phosphor-icons/vue";
import { compareTimestamps, timestampToDateString } from "@/lib/datetime";
import { useNotification } from "@/app/composables/use-notification";
import RowCard from "./row-card.vue";
import DataView from "./data-view.vue";
import { useStore } from "../composables/use-store";
import { useFetch } from "../composables/use-fetch";

const { isShowing, hide } = useNotification();
const message = useMessage();
const store = useStore();
const patchNotification = useFetch(
   "/api/notifications/:notificationId",
   "PATCH",
);
const patchNotifications = useFetch("/api/notifications", "PATCH");
const deleteNotification = useFetch(
   "/api/notifications/:notificationId",
   "DELETE",
);
const deleteNotifications = useFetch("/api/notifications", "DELETE");
const notifications = computed(() =>
   Array.from(store.allNotifications.values()).sort((a, b) =>
      compareTimestamps(b.createdAt, a.createdAt),
   ),
);

async function markAllAsRead() {
   try {
      await patchNotifications.execute({
         body: {
            isRead: true,
         },
      });
      message.create("All notifications marked as read");
   } catch (error) {
      console.error("Failed to mark all notifications as read", error);
      message.error("Failed to mark all notifications as read");
   }
}

async function clearAll() {
   try {
      await deleteNotifications.execute();
      message.create("All notifications cleared");
   } catch (error) {
      console.error("Failed to clear notifications", error);
      message.error("Failed to clear notifications");
   }
}

async function markAsRead(id: string) {
   try {
      await patchNotification.execute({
         params: {
            notificationId: id,
         },
         body: {
            isRead: true,
         },
      });
   } catch (error) {
      console.error("Failed to mark notification as read", error);
      message.error("Failed to mark notification as read");
   }
}

async function markAsUnread(id: string) {
   try {
      await patchNotification.execute({
         params: {
            notificationId: id,
         },
         body: {
            isRead: false,
         },
      });
   } catch (error) {
      console.error("Failed to mark notification as unread", error);
      message.error("Failed to mark notification as unread");
   }
}

async function deleteNotif(id: string) {
   try {
      await deleteNotification.execute({
         params: {
            notificationId: id,
         },
      });
   } catch (error) {
      console.error("Failed to delete notification", error);
      message.error("Failed to delete notification");
   }
}

onMounted(() => {
   store.loadNotifications();
});
</script>
