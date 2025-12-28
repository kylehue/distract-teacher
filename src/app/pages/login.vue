<template>
   <div class="flex items-center justify-center h-screen">
      <NCard class="flex w-[420px]!" title="Login">
         <NForm>
            <NFormItem
               label="Username"
               :validation-status="usernameStatus"
               :feedback="usernameFeedback"
            >
               <NInput
                  v-model:value="username"
                  placeholder="Enter your username"
                  :disabled="isLoading"
               />
            </NFormItem>

            <NFormItem
               label="Password"
               :validation-status="passwordStatus"
               :feedback="passwordFeedback"
            >
               <NInput
                  v-model:value="password"
                  type="password"
                  placeholder="Enter your password"
                  :disabled="isLoading"
               />
            </NFormItem>

            <div class="flex flex-col items-center gap-4 mt-2">
               <NButton
                  type="primary"
                  block
                  :loading="isLoading"
                  @click="login"
               >
                  Login
               </NButton>
               <RouterLink to="/register">
                  <NButton type="tertiary" text>
                     Don't have an account? Register
                  </NButton>
               </RouterLink>
            </div>
         </NForm>
      </NCard>
   </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NCard, NForm, NFormItem, NInput, NButton } from "naive-ui";
import { useSocket } from "../composables/use-socket";
import { useRouter, RouterLink } from "vue-router";

const socket = useSocket();
const router = useRouter();
const username = ref("");
const password = ref("");
const usernameStatus = ref<"error" | "success">("success");
const passwordStatus = ref<"error" | "success">("success");
const usernameFeedback = ref("");
const passwordFeedback = ref("");
const isLoading = ref(false);

function login() {
   isLoading.value = true;
   usernameStatus.value = "success";
   passwordStatus.value = "success";
   usernameFeedback.value = "";
   passwordFeedback.value = "";
   socket.emit("teacher:login", {
      username: username.value,
      password: password.value,
   });
}

socket.on("teacher:login_success", () => {
   isLoading.value = false;
});

socket.on("teacher:login_error", (data) => {
   isLoading.value = false;

   const fieldErrors = data.fieldErrors;
   if (fieldErrors.username) {
      usernameStatus.value = "error";
      usernameFeedback.value = fieldErrors.username;
   }
   if (fieldErrors.password) {
      passwordStatus.value = "error";
      passwordFeedback.value = fieldErrors.password;
   }
});
</script>

<style scoped></style>
