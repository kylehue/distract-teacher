<template>
   <div class="flex items-center justify-evenly w-full h-full">
      <NCard class="flex w-[420px]!" title="Welcome Back :)" :bordered="false">
         <NForm @keydown.enter="login()">
            <NFormItem
               label="Username"
               :validation-status="usernameStatus"
               :feedback="usernameFeedback"
            >
               <NInput
                  v-model:value="username"
                  placeholder="Enter your username"
                  :disabled="auth.isLoading"
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
                  show-password-on="click"
                  :disabled="auth.isLoading"
               />
            </NFormItem>

            <div class="flex flex-col items-center gap-4 mt-2">
               <NButton
                  type="primary"
                  block
                  :loading="auth.isLoading"
                  @click="login()"
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
import { ref, onBeforeMount } from "vue";
import { NCard, NForm, NFormItem, NInput, NButton, useMessage } from "naive-ui";
import { RouterLink, useRouter } from "vue-router";
import { useStore } from "../composables/use-store";
import { useAuthStore } from "../composables/use-auth-store";

const auth = useAuthStore();
const router = useRouter();
const message = useMessage();
const store = useStore();
const username = ref("");
const password = ref("");
const usernameStatus = ref<"error" | "success">("success");
const passwordStatus = ref<"error" | "success">("success");
const usernameFeedback = ref("");
const passwordFeedback = ref("");

async function login() {
   usernameStatus.value = "success";
   passwordStatus.value = "success";
   usernameFeedback.value = "";
   passwordFeedback.value = "";
   try {
      await auth.loginWithCredentials(username.value, password.value);
   } catch {
      if (!auth.postLogin.error) {
         message.error("An unknown error occurred during login.");
         return;
      }

      if (!auth.postLogin.error.fieldErrors) {
         message.error(auth.postLogin.error.message);
         return;
      }

      const fieldErrors = auth.postLogin.error.fieldErrors;
      if (fieldErrors.username) {
         usernameStatus.value = "error";
         usernameFeedback.value = fieldErrors.username;
      }
      if (fieldErrors.password) {
         passwordStatus.value = "error";
         passwordFeedback.value = fieldErrors.password;
      }
   }

   store.clear();
}

onBeforeMount(() => {
   if (auth.isAuthenticated) {
      console.log(123)
      router.replace("/dashboard");
   }
});
</script>

<style scoped></style>
