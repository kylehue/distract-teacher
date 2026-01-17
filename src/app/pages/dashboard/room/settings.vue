<template>
   <div class="flex flex-col gap-4">
      <NCard>
         <template #header>General</template>
         <NForm class="flex flex-col gap-2 items-start justify-start">
            <NFormItem
               label="Room Title"
               content-class="flex items-start gap-2"
               :feedback="form.titleFeedback"
               :validation-status="form.titleStatus"
            >
               <NInput
                  v-model:value="form.title"
                  placeholder="Type the room title"
                  :disabled="patchRoom.isLoading"
               />
            </NFormItem>
            <NFormItem
               label="Room Code"
               content-class="flex items-start gap-2"
               :feedback="form.codeFeedback"
               :validation-status="form.codeStatus"
            >
               <NInput
                  v-model:value="form.code"
                  placeholder="Type the room code"
                  :disabled="patchRoom.isLoading"
               />
            </NFormItem>
            <NFormItem
               label="Student Capacity"
               content-class="flex items-start gap-2"
               :feedback="form.studentCapacityFeedback"
               :validation-status="form.studentCapacityStatus"
            >
               <NInputNumber
                  v-model:value="form.studentCapacity"
                  placeholder="Enter the max number of students"
                  :min="0"
                  :disabled="patchRoom.isLoading"
               />
            </NFormItem>
         </NForm>
         <template #action>
            <div class="flex justify-between gap-2">
               <NButton
                  quaternary
                  :disabled="
                     (form.studentCapacity === room.studentCapacity &&
                        form.code === room.code &&
                        form.title === room.title) ||
                     patchRoom.isLoading
                  "
                  @click="resetGeneralSettings()"
               >
                  Reset All
               </NButton>
               <NButton
                  :disabled="
                     form.studentCapacity === room.studentCapacity &&
                     form.code === room.code &&
                     form.title === room.title
                  "
                  :loading="patchRoom.isLoading"
                  @click="saveGeneralSettings()"
               >
                  Save
               </NButton>
            </div>
         </template>
      </NCard>
      <NCard>
         <template #header>Monitoring</template>
         <NForm class="flex flex-col gap-2 items-start justify-start">
            <NFormItem
               label="Evidence Warning Level"
               content-class="flex items-start gap-2"
               :validation-status="form.evidenceWarningLevelStatus"
               :feedback="
                  form.evidenceWarningLevelFeedback ||
                  'Set at which warning level the system starts recording evidences.'
               "
            >
               <NSelect
                  :options="[
                     { value: 'low', label: 'Low' },
                     { value: 'moderate', label: 'Moderate' },
                     { value: 'severe', label: 'Severe' },
                  ]"
                  v-model:value="form.evidenceWarningLevel"
                  :disabled="patchRoom.isLoading"
               ></NSelect>
            </NFormItem>
            <NFormItem
               :show-label="false"
               content-class="flex items-start gap-2"
               :validation-status="form.severeWarningPunishmentStatus"
               :feedback="
                  form.severeWarningPunishmentFeedback ||
                  'Lock students\' systems when they reach severe warning level.'
               "
            >
               <NText>Severe Warning Punishment</NText>
               <NSwitch
                  v-model:value="form.severeWarningPunishment"
                  :disabled="patchRoom.isLoading"
               ></NSwitch>
            </NFormItem>
         </NForm>
         <template #action>
            <div class="flex justify-between gap-2">
               <NButton
                  quaternary
                  :disabled="
                     (form.evidenceWarningLevel === room.evidenceWarningLevel &&
                        form.severeWarningPunishment ===
                           room.severeWarningPunishment) ||
                     patchRoom.isLoading
                  "
                  @click="resetMonitoringSettings()"
               >
                  Reset All
               </NButton>
               <NButton
                  :disabled="
                     form.evidenceWarningLevel === room.evidenceWarningLevel &&
                     form.severeWarningPunishment ===
                        room.severeWarningPunishment
                  "
                  :loading="patchRoom.isLoading"
                  @click="saveMonitoringSettings()"
               >
                  Save
               </NButton>
            </div>
         </template>
      </NCard>
      <NCard>
         <template #header>Joining Permission</template>
         <NForm class="flex flex-col gap-2 items-start justify-start">
            <NFormItem
               :show-label="false"
               content-class="flex items-start gap-2"
               :validation-status="form.allowLateStudentsStatus"
               :feedback="
                  form.allowLateStudentsFeedback ||
                  'Allow new students to join the room when monitoring has started.'
               "
            >
               <NText>Allow Late Students</NText>
               <NSwitch
                  v-model:value="form.allowLateStudents"
                  :disabled="patchRoom.isLoading"
               ></NSwitch>
            </NFormItem>
            <NFormItem
               :show-label="false"
               content-class="flex items-start gap-2"
               :validation-status="form.joinConfirmationStatus"
               :feedback="
                  form.joinConfirmationFeedback ||
                  'Require students to be confirmed before joining the room.'
               "
            >
               <NText>Join Confirmation</NText>
               <NSwitch
                  v-model:value="form.joinConfirmation"
                  :disabled="patchRoom.isLoading"
               ></NSwitch>
            </NFormItem>
         </NForm>
         <template #action>
            <div class="flex justify-between gap-2">
               <NButton
                  quaternary
                  :disabled="
                     (form.allowLateStudents === room.allowLateStudents &&
                        form.joinConfirmation === room.joinConfirmation) ||
                     patchRoom.isLoading
                  "
                  @click="resetJoiningPermissionSettings()"
               >
                  Reset All
               </NButton>
               <NButton
                  :disabled="
                     form.allowLateStudents === room.allowLateStudents &&
                     form.joinConfirmation === room.joinConfirmation
                  "
                  :loading="patchRoom.isLoading"
                  @click="saveJoiningPermissionSettings()"
               >
                  Save
               </NButton>
            </div>
         </template>
      </NCard>
      <NCard>
         <template #header>Others</template>
         <NForm class="flex flex-col gap-2 items-start justify-start">
            <NFormItem
               :show-label="false"
               content-class="flex items-start gap-2"
               feedback="Once you delete a room, there is no going back. Please be certain."
            >
               <NPopconfirm
                  @positive-click="handleDeleteRoom()"
                  :positive-button-props="{ type: 'error' }"
                  :show-icon="false"
               >
                  <template #trigger>
                     <NButton
                        type="error"
                        secondary
                        :disabled="patchRoom.isLoading"
                     >
                        Delete Room
                     </NButton>
                  </template>
                  Are you sure you want to delete this room?
               </NPopconfirm>
            </NFormItem>
         </NForm>
      </NCard>
   </div>
</template>

<script setup lang="ts">
import {
   NButton,
   NCard,
   NCheckbox,
   NForm,
   NFormItem,
   NInput,
   NInputNumber,
   NPopconfirm,
   NSelect,
   NSwitch,
   NText,
   useDialog,
   useMessage,
} from "naive-ui";
import { RoomInfo } from "@/lib/typings";
import { computed, h, inject, nextTick, reactive, ref, Ref } from "vue";
import { useFetch } from "@/app/composables/use-fetch";
import { useStore } from "@/app/composables/use-store";
import { PhTrash } from "@phosphor-icons/vue";
import { useRouter } from "vue-router";

const room = inject<Ref<RoomInfo>>("room")!;
const store = useStore();

const form = reactive({
   title: room.value.title,
   titleStatus: "success" as "success" | "error",
   titleFeedback: "",
   code: room.value.code,
   codeStatus: "success" as "success" | "error",
   codeFeedback: "",
   studentCapacity: room.value.studentCapacity,
   studentCapacityStatus: "success" as "success" | "error",
   studentCapacityFeedback: "",
   evidenceWarningLevel: room.value.evidenceWarningLevel,
   evidenceWarningLevelStatus: "success" as "success" | "error",
   evidenceWarningLevelFeedback: "",
   severeWarningPunishment: room.value.severeWarningPunishment,
   severeWarningPunishmentStatus: "success" as "success" | "error",
   severeWarningPunishmentFeedback: "",
   allowLateStudents: room.value.allowLateStudents,
   allowLateStudentsStatus: "success" as "success" | "error",
   allowLateStudentsFeedback: "",
   joinConfirmation: room.value.joinConfirmation,
   joinConfirmationStatus: "success" as "success" | "error",
   joinConfirmationFeedback: "",
});
const message = useMessage();
const patchRoom = useFetch<{ room: RoomInfo }>(
   `/api/rooms/${room.value.id}`,
   "PATCH"
);

async function saveGeneralSettings() {
   form.titleFeedback = "";
   form.codeFeedback = "";
   form.studentCapacityFeedback = "";
   form.titleStatus = "success";
   form.codeStatus = "success";
   form.studentCapacityStatus = "success";
   try {
      const { data } = await patchRoom.execute({
         body: {
            title: form.title,
            code: form.code,
            studentCapacity: form.studentCapacity,
         },
      });

      store.upsertRooms([data!.room]);

      message.success("General settings has been updated.");
   } catch {
      if (!patchRoom.error) {
         return;
      }

      if (!patchRoom.error.fieldErrors) {
         message.error(patchRoom.error.message);
         return;
      }

      const fieldErrors = patchRoom.error.fieldErrors;
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

function resetGeneralSettings() {
   form.title = room.value.title;
   form.code = room.value.code;
   form.studentCapacity = room.value.studentCapacity;
   form.titleStatus = "success";
   form.codeStatus = "success";
   form.studentCapacityStatus = "success";
   form.titleFeedback = "";
   form.codeFeedback = "";
   form.studentCapacityFeedback = "";
}

async function saveMonitoringSettings() {
   form.evidenceWarningLevelFeedback = "";
   form.severeWarningPunishmentFeedback = "";
   form.evidenceWarningLevelStatus = "success";
   form.severeWarningPunishmentStatus = "success";
   try {
      const { data } = await patchRoom.execute({
         body: {
            evidenceWarningLevel: form.evidenceWarningLevel,
            severeWarningPunishment: form.severeWarningPunishment,
         },
      });

      store.upsertRooms([data!.room]);

      message.success("Monitoring settings has been updated.");
   } catch {
      if (!patchRoom.error) {
         return;
      }

      if (!patchRoom.error.fieldErrors) {
         message.error(patchRoom.error.message);
         return;
      }

      const fieldErrors = patchRoom.error.fieldErrors;
      if (fieldErrors.evidenceWarningLevel) {
         form.evidenceWarningLevelStatus = "error";
         form.evidenceWarningLevelFeedback = fieldErrors.evidenceWarningLevel;
      }

      if (fieldErrors.severeWarningPunishment) {
         form.severeWarningPunishmentStatus = "error";
         form.severeWarningPunishmentFeedback =
            fieldErrors.severeWarningPunishment;
      }
   }
}

function resetMonitoringSettings() {
   form.evidenceWarningLevel = room.value.evidenceWarningLevel;
   form.severeWarningPunishment = room.value.severeWarningPunishment;
   form.evidenceWarningLevelStatus = "success";
   form.severeWarningPunishmentStatus = "success";
   form.evidenceWarningLevelFeedback = "";
   form.severeWarningPunishmentFeedback = "";
}

async function saveJoiningPermissionSettings() {
   form.allowLateStudentsFeedback = "";
   form.joinConfirmationFeedback = "";
   form.allowLateStudentsStatus = "success";
   form.joinConfirmationStatus = "success";
   try {
      const { data } = await patchRoom.execute({
         body: {
            allowLateStudents: form.allowLateStudents,
            joinConfirmation: form.joinConfirmation,
         },
      });

      store.upsertRooms([data!.room]);

      message.success("Join permission settings has been updated.");
   } catch {
      if (!patchRoom.error) {
         return;
      }

      if (!patchRoom.error.fieldErrors) {
         message.error(patchRoom.error.message);
         return;
      }

      const fieldErrors = patchRoom.error.fieldErrors;
      if (fieldErrors.allowLateStudents) {
         form.allowLateStudentsStatus = "error";
         form.allowLateStudentsFeedback = fieldErrors.allowLateStudents;
      }

      if (fieldErrors.joinConfirmation) {
         form.joinConfirmationStatus = "error";
         form.joinConfirmationFeedback = fieldErrors.joinConfirmation;
      }
   }
}

function resetJoiningPermissionSettings() {
   form.allowLateStudents = room.value.allowLateStudents;
   form.joinConfirmation = room.value.joinConfirmation;
   form.allowLateStudentsStatus = "success";
   form.joinConfirmationStatus = "success";
   form.allowLateStudentsFeedback = "";
   form.joinConfirmationFeedback = "";
}

const dialog = useDialog();
const deleteRoom = useFetch(`/api/rooms/${room.value.id}`, "DELETE");
const router = useRouter();
function handleDeleteRoom() {
   let value = ref("");
   let feedback = ref("");
   let roomCode = room.value.code;
   let roomId = room.value.id;
   let _dialog = dialog.error({
      title: "Confirm Delete",
      content: () => {
         return h("div", { class: "flex flex-col gap-2" }, [
            h(
               NText,
               { depth: 3, class: "text-xs" },
               {
                  default: () =>
                     "Please note that this action is IRREVERSIBLE. It will delete all associated data with this room such as monitor logs, evidences, and student records.",
               }
            ),
            h(NForm, null, {
               default: () => {
                  return h(
                     NFormItem,
                     {
                        label: `Please type '${roomCode}' to confirm:`,
                        validationStatus: feedback.value ? "error" : "success",
                        feedback: feedback.value,
                     },
                     {
                        default: () => {
                           return h(NInput, {
                              type: "text",
                              placeholder: `Type ${roomCode} to confirm`,
                              onUpdateValue(v) {
                                 value.value = v;
                              },
                           });
                        },
                     }
                  );
               },
            }),
         ]);
      },
      positiveText: "Delete",
      showIcon: false,
      onPositiveClick: async () => {
         feedback.value = "";
         if (value.value !== roomCode) {
            feedback.value = "Room code does not match.";
            return false;
         }

         // delete
         try {
            await deleteRoom.execute();
            _dialog.destroy();
            message.success("Room has been deleted.");
            router.push("/dashboard/rooms");
            nextTick(() => {
               store.deleteRoom(roomId);
            });
         } catch {
            if (!deleteRoom.error) {
               message.error("Failed to delete the room.");
               return;
            }

            message.error(deleteRoom.error.message);
         }
      },
   });
}
</script>
