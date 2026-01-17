<template>
   <div class="flex items-center justify-center mt-20">
      <NCard class="flex w-[420px]!" title="Register">
         <NForm>
            <NFormItem
               label="Username"
               :validation-status="usernameStatus"
               :feedback="usernameFeedback"
            >
               <NInput
                  v-model:value="username"
                  placeholder="Enter your username"
                  :disabled="postRegister.isLoading"
               />
            </NFormItem>

            <NFormItem
               label="Password"
               :validation-status="password1Status"
               :feedback="password1Feedback"
            >
               <NInput
                  v-model:value="password1"
                  type="password"
                  placeholder="Enter your password"
                  :disabled="postRegister.isLoading"
               />
            </NFormItem>

            <NFormItem
               label="Confirm Password"
               :validation-status="password2Status"
               :feedback="password2Feedback"
            >
               <NInput
                  v-model:value="password2"
                  type="password"
                  placeholder="Enter your password again"
                  :disabled="postRegister.isLoading"
               />
            </NFormItem>

            <div class="flex flex-col items-center gap-4 mt-2">
               <NButton
                  type="primary"
                  block
                  :loading="postRegister.isLoading"
                  @click="register"
               >
                  Register
               </NButton>
               <RouterLink to="/login">
                  <NButton type="tertiary" text>
                     Already have an account? Login
                  </NButton>
               </RouterLink>
            </div>
         </NForm>
      </NCard>
   </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NCard, NForm, NFormItem, NInput, NButton, useMessage } from "naive-ui";
import { useSocket } from "../composables/use-socket";
import { useRouter, RouterLink } from "vue-router";
import { useFetch } from "../composables/use-fetch";

const socket = useSocket();
const router = useRouter();
const username = ref("");
const password1 = ref("");
const password2 = ref("");
const usernameStatus = ref<"success" | "error">("success");
const password1Status = ref<"success" | "error">("success");
const password2Status = ref<"success" | "error">("success");
const usernameFeedback = ref("");
const password1Feedback = ref("");
const password2Feedback = ref("");
const postRegister = useFetch("/api/register", "POST");
const message = useMessage();

async function register() {
   usernameStatus.value = "success";
   password1Status.value = "success";
   password2Status.value = "success";
   usernameFeedback.value = "";
   password1Feedback.value = "";
   password2Feedback.value = "";

   try {
      await postRegister.execute({
         body: {
            username: username.value,
            password1: password1.value,
            password2: password2.value,
         },
      });

      message.success("Registration successful!");
      router.push("/login");
   } catch {
      if (!postRegister.error) {
         return;
      }

      if (!postRegister.error.fieldErrors) {
         message.error(postRegister.error.message);
         return;
      }

      const fieldErrors = postRegister.error.fieldErrors;
      if (fieldErrors.username) {
         usernameStatus.value = "error";
         usernameFeedback.value = fieldErrors.username;
      }
      if (fieldErrors.password1) {
         password1Status.value = "error";
         password1Feedback.value = fieldErrors.password1;
      }
      if (fieldErrors.password2) {
         password2Status.value = "error";
         password2Feedback.value = fieldErrors.password2;
      }
   }
}
</script>

<style scoped></style>
