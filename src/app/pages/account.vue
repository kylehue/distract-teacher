<template>
   <template v-if="auth.isLoading">
      <Loader text="Loading account settings..." />
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
            <NText strong class="text-lg"> Account Settings </NText>
         </div>
         <NDivider class="m-0!" />
         <div class="flex flex-col h-full">
            <div class="w-full h-4 flex-none"></div>
            <div class="flex flex-col gap-4">
               <NCard>
                  <template #header>Profile</template>
                  <NForm
                     @keydown.enter="saveProfileSettings()"
                     class="flex flex-col gap-2 items-start justify-start"
                  >
                     <NFormItem
                        label="Display Name"
                        content-class="flex items-start gap-2"
                        :feedback="form.displayNameFeedback"
                        :validation-status="form.displayNameStatus"
                     >
                        <NInput
                           v-model:value="form.displayName"
                           placeholder="Type your display name"
                           :disabled="patchAccount.isLoading"
                        />
                     </NFormItem>
                  </NForm>
                  <template #action>
                     <div class="flex justify-between gap-2">
                        <NButton
                           quaternary
                           :disabled="
                              form.displayName === auth.teacher.displayName ||
                              patchAccount.isLoading
                           "
                           @click="resetProfileSettings()"
                        >
                           Reset All
                        </NButton>
                        <NButton
                           :disabled="
                              form.displayName === auth.teacher.displayName
                           "
                           :loading="patchAccount.isLoading"
                           @click="saveProfileSettings()"
                        >
                           Save
                        </NButton>
                     </div>
                  </template>
               </NCard>
               <NCard>
                  <template #header>Account</template>
                  <NForm
                     @keydown.enter="saveAccountSettings()"
                     class="flex flex-col gap-2 items-start justify-start"
                  >
                     <NFormItem
                        label="Username"
                        content-class="flex items-start gap-2"
                        :feedback="form.usernameFeedback"
                        :validation-status="form.usernameStatus"
                     >
                        <NInput
                           v-model:value="form.username"
                           placeholder="Type your username"
                           :disabled="patchAccount.isLoading"
                        />
                     </NFormItem>
                  </NForm>
                  <template #action>
                     <div class="flex justify-between gap-2">
                        <NButton
                           quaternary
                           :disabled="
                              form.username === auth.teacher.username ||
                              patchAccount.isLoading
                           "
                           @click="resetAccountSettings()"
                        >
                           Reset All
                        </NButton>
                        <NButton
                           :disabled="form.username === auth.teacher.username"
                           :loading="patchAccount.isLoading"
                           @click="saveAccountSettings()"
                        >
                           Save
                        </NButton>
                     </div>
                  </template>
               </NCard>
               <NCard>
                  <template #header>Password</template>
                  <NForm
                     @keydown.enter="savePasswordSettings()"
                     class="flex flex-col gap-2 items-start justify-start"
                  >
                     <NFormItem
                        label="New Password"
                        content-class="flex items-start gap-2"
                        :feedback="form.password1Feedback"
                        :validation-status="form.password1Status"
                     >
                        <NInput
                           v-model:value="form.password1"
                           placeholder="Type your new password"
                           :disabled="patchAccount.isLoading"
                           show-password-on="click"
                           type="password"
                        />
                     </NFormItem>
                     <NFormItem
                        label="Confirm New Password"
                        content-class="flex items-start gap-2"
                        :feedback="form.password2Feedback"
                        :validation-status="form.password2Status"
                     >
                        <NInput
                           v-model:value="form.password2"
                           placeholder="Confirm your new password"
                           :disabled="patchAccount.isLoading"
                           show-password-on="click"
                           type="password"
                        />
                     </NFormItem>
                  </NForm>
                  <template #action>
                     <div class="flex justify-between gap-2">
                        <NButton
                           quaternary
                           :disabled="
                              (!form.password1 && !form.password2) ||
                              patchAccount.isLoading
                           "
                           @click="resetPasswordSettings()"
                        >
                           Reset All
                        </NButton>
                        <NButton
                           :disabled="!form.password1 || !form.password2"
                           :loading="patchAccount.isLoading"
                           @click="savePasswordSettings()"
                        >
                           Change Password
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
                        feedback="Clear all cached data. This action is safe and will not delete any data."
                     >
                        <NButton
                           secondary
                           :loading="postClearCache.isLoading"
                           @click="postClearCache.execute()"
                        >
                           Clear Cache
                        </NButton>
                     </NFormItem>
                     <RouterLink to="/trash">
                        <NButton secondary @click="postClearCache.execute()">
                           View Trash
                        </NButton>
                     </RouterLink>
                  </NForm>
               </NCard>
            </div>
            <div class="w-full h-8 flex-none"></div>
         </div>
      </NLayoutContent>
   </NLayout>
</template>

<script setup lang="ts">
import {
   NButton,
   NCard,
   NDivider,
   NForm,
   NFormItem,
   NInput,
   NLayout,
   NLayoutContent,
   NText,
   useMessage,
} from "naive-ui";
import { TeacherInfo } from "@/lib/typings";
import {
   onMounted,
   reactive,
} from "vue";
import { RouterLink } from "vue-router";
import { useFetch } from "@/app/composables/use-fetch";
import { PhArrowLeft } from "@phosphor-icons/vue";
import { useAuthStore } from "../composables/use-auth-store";
import { UnauthorizedError } from "@/lib/errors";
import Loader from "@/app/components/loader.vue"

const auth = useAuthStore();

const form = reactive({
   displayName: auth.teacher?.displayName,
   displayNameStatus: "success" as "success" | "error",
   displayNameFeedback: "",
   username: auth.teacher?.username,
   usernameStatus: "success" as "success" | "error",
   usernameFeedback: "",
   password1: "",
   password1Status: "success" as "success" | "error",
   password1Feedback: "",
   password2: "",
   password2Status: "success" as "success" | "error",
   password2Feedback: "",
});
const message = useMessage();

const postClearCache = useFetch("/api/clear_cache", "POST");

const patchAccount = useFetch<{ teacher: TeacherInfo }>(
   "/api/account",
   "PATCH",
);

async function saveProfileSettings() {
   form.displayNameFeedback = "";
   form.displayNameStatus = "success";
   try {
      await patchAccount.execute({
         body: {
            displayName: form.displayName,
         },
      });

      message.success("Profile settings has been updated.");
   } catch {
      if (!patchAccount.error) {
         return;
      }

      if (!patchAccount.error.fieldErrors) {
         message.error(patchAccount.error.message);
         return;
      }

      const fieldErrors = patchAccount.error.fieldErrors;
      if (fieldErrors.displayName) {
         form.displayNameStatus = "error";
         form.displayNameFeedback = fieldErrors.displayName;
      }
   }
}

function resetProfileSettings() {
   form.displayName = auth.teacher!.displayName;
   form.displayNameStatus = "success";
   form.displayNameFeedback = "";
}

async function saveAccountSettings() {
   form.usernameFeedback = "";
   form.usernameStatus = "success";
   try {
      await patchAccount.execute({
         body: {
            username: form.username,
         },
      });

      message.success("Account settings has been updated.");
   } catch {
      if (!patchAccount.error) {
         return;
      }

      if (!patchAccount.error.fieldErrors) {
         message.error(patchAccount.error.message);
         return;
      }

      const fieldErrors = patchAccount.error.fieldErrors;
      if (fieldErrors.username) {
         form.usernameStatus = "error";
         form.usernameFeedback = fieldErrors.username;
      }
   }
}

function resetAccountSettings() {
   form.username = auth.teacher!.username;
   form.usernameStatus = "success";
   form.usernameFeedback = "";
}

async function savePasswordSettings() {
   form.password1Feedback = "";
   form.password2Feedback = "";
   form.password1Status = "success";
   form.password2Status = "success";
   try {
      await patchAccount.execute({
         body: {
            password1: form.password1,
            password2: form.password2,
         },
      });

      message.success("Password settings has been updated.");
   } catch {
      if (!patchAccount.error) {
         return;
      }

      if (!patchAccount.error.fieldErrors) {
         message.error(patchAccount.error.message);
         return;
      }

      const fieldErrors = patchAccount.error.fieldErrors;
      if (fieldErrors.password1) {
         form.password1Status = "error";
         form.password1Feedback = fieldErrors.password1;
      }

      if (fieldErrors.password2) {
         form.password2Status = "error";
         form.password2Feedback = fieldErrors.password2;
      }
   }
}

function resetPasswordSettings() {
   form.password1 = "";
   form.password2 = "";
   form.password1Status = "success";
   form.password2Status = "success";
   form.password1Feedback = "";
   form.password2Feedback = "";
}

onMounted(async () => {
   try {
      await auth.loginWithCookie();

      form.displayName = auth.teacher?.displayName;
      form.username = auth.teacher?.username;
   } catch {
      throw new UnauthorizedError();
   }
});
</script>
