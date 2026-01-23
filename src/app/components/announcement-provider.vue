<template>
   <NModal v-model:show="isShowing" closable>
      <template v-if="!room">No room</template>
      <NCard
         v-else
         title="Send Announcement"
         closable
         @close="hide"
         class="w-[420px]!"
      >
         <NForm>
            <NFormItem
               label="Room"
               :validation-status="form.messageStatus"
               :feedback="form.messageFeedback"
            >
               <NInput :value="room.title" disabled />
            </NFormItem>
            <NFormItem
               label="Message"
               :validation-status="form.messageStatus"
               :feedback="form.messageFeedback"
            >
               <NInput
                  type="textarea"
                  v-model:value="form.message"
                  placeholder="Enter the message"
                  :disabled="postAnnouncement.isLoading"
                  :maxlength="256"
                  :autosize="{ minRows: 3, maxRows: 9 }"
                  show-count
               />
            </NFormItem>
            <NButton
               type="primary"
               block
               class="mt-2!"
               @click="sendAnnoucement()"
               :loading="postAnnouncement.isLoading"
            >
               Send Announcement
            </NButton>
         </NForm>
      </NCard>
   </NModal>
</template>

<script setup lang="ts">
import {
   NButton,
   NModal,
   NCard,
   NForm,
   NFormItem,
   NInput,
   NText,
   useMessage,
} from "naive-ui";
import { reactive } from "vue";
import { useAnnouncement } from "../composables/use-announcement";
import { useSocket } from "../composables/use-socket";
import { useFetch } from "../composables/use-fetch";

const { isShowing, hide, room } = useAnnouncement();
const postAnnouncement = useFetch<{
   success: boolean;
}>("/api/rooms/announcement", "POST");
const form = reactive({
   message: "",
   messageFeedback: "",
   messageStatus: "success" as "success" | "error",
});
const message = useMessage();

async function sendAnnoucement() {
   if (!room.value) {
      form.messageStatus = "error";
      form.messageFeedback = "Room code is missing";
      return;
   }

   form.messageFeedback = "";
   form.messageStatus = "success";

   try {
      await postAnnouncement.execute({
         body: {
            roomCode: room.value.code,
            message: form.message.trim(),
         },
      });

      hide();
      form.message = "";
      message.success("Announcement sent successfully!");
   } catch {
      if (!postAnnouncement.error) {
         message.error("Failed to send announcement");
         return;
      }

      if (!postAnnouncement.error.fieldErrors) {
         message.error(
            postAnnouncement.error.message || "Failed to send announcement",
         );
         return;
      }

      const fieldErrors = postAnnouncement.error.fieldErrors;
      if (fieldErrors.message) {
         form.messageStatus = "error";
         form.messageFeedback = fieldErrors.message;
      }

      if (fieldErrors.roomCode) {
         form.messageStatus = "error";
         form.messageFeedback = fieldErrors.roomCode;
      }
   }
}
</script>
