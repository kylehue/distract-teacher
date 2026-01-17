<template>
   <NModal v-model:show="isShowing" closable>
      <NCard title="Create Room" closable @close="hide" class="w-[420px]!">
         <NForm>
            <NFormItem
               label="Room Title"
               :validation-status="form.titleStatus"
               :feedback="form.titleFeedback"
            >
               <NInput
                  v-model:value="form.title"
                  placeholder="Enter the room title"
                  :disabled="postRooms.isLoading"
               />
            </NFormItem>

            <NFormItem
               label="Room Code"
               :validation-status="form.codeStatus"
               :feedback="form.codeFeedback"
            >
               <div class="flex flex-col gap-1 w-full">
                  <NInput
                     v-model:value="form.code"
                     placeholder="Enter the room code"
                     :disabled="form.autoGenerateCode || postRooms.isLoading"
                  />
                  <NCheckbox
                     class="w-fit"
                     v-model:checked="form.autoGenerateCode"
                     size="small"
                     :disabled="postRooms.isLoading"
                  >
                     <NText depth="3" class="text-xs">
                        Auto-generate room code
                     </NText>
                  </NCheckbox>
               </div>
            </NFormItem>

            <NFormItem
               label="Student Capacity"
               :validation-status="form.studentCapacityStatus"
               :feedback="form.studentCapacityFeedback"
            >
               <NInputNumber
                  v-model:value="form.studentCapacity"
                  placeholder="Enter the max number of students"
                  class="w-full"
                  :disabled="postRooms.isLoading"
                  :min="0"
               />
            </NFormItem>

            <NButton
               type="primary"
               block
               class="mt-2!"
               :loading="postRooms.isLoading"
               @click="createRoom()"
            >
               Create
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
   NInputNumber,
   NCheckbox,
   NText,
   useMessage,
} from "naive-ui";
import { reactive } from "vue";
import { useCreateRoom } from "../composables/use-create-room";
import { useFetch } from "../composables/use-fetch";
import { useStore } from "../composables/use-store";
import { RoomInfo } from "@/lib/typings";

const message = useMessage();
const postRooms = useFetch<{
   room: RoomInfo;
}>("/api/rooms", "POST");
const { isShowing, hide } = useCreateRoom();
const store = useStore();
const form = reactive({
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

async function createRoom() {
   form.titleFeedback = "";
   form.codeFeedback = "";
   form.studentCapacityFeedback = "";
   form.titleStatus = "success";
   form.codeStatus = "success";
   form.studentCapacityStatus = "success";

   try {
      const { data } = await postRooms.execute({
         body: {
            title: form.title,
            code: form.code,
            autoGenerateCode: form.autoGenerateCode,
            studentCapacity: form.studentCapacity,
         },
      });

      form.title = "";
      form.code = "";
      form.studentCapacity = 10;
      form.autoGenerateCode = true;
      store.upsertRooms([data!.room]);
      message.success("Room created successfully!");
      hide();
   } catch {
      if (!postRooms.error) {
         return;
      }

      if (!postRooms.error.fieldErrors) {
         message.error(postRooms.error.message);
         return;
      }

      const fieldErrors = postRooms.error.fieldErrors;
      if (fieldErrors.title) {
         form.titleStatus = "error";
         form.titleFeedback = fieldErrors.title;
      }
      if (fieldErrors.code) {
         form.codeStatus = "error";
         form.codeFeedback = fieldErrors.code;
      }
      if (fieldErrors.studentCapacity) {
         form.studentCapacityStatus = "error";
         form.studentCapacityFeedback = fieldErrors.studentCapacity;
      }
   }
}
</script>
