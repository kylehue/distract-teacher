<template>
   <div class="flex items-center justify-center mt-20">
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
                  :disabled="postLogin.isLoading"
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
                  :disabled="postLogin.isLoading"
               />
            </NFormItem>

            <div class="flex flex-col items-center gap-4 mt-2">
               <NButton
                  type="primary"
                  block
                  :loading="postLogin.isLoading"
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
import { inject, ref } from "vue";
import { NCard, NForm, NFormItem, NInput, NButton, useMessage } from "naive-ui";
import { useRouter, RouterLink } from "vue-router";
import { useFetch } from "../composables/use-fetch";
import { useStore } from "../composables/use-store";
import { TEACHER_INJECTION_KEY } from "@/lib/injection-keys";
import { TeacherInfo } from "@/lib/typings";

const router = useRouter();
const postLogin = useFetch<{ teacher: TeacherInfo }>("/api/login", "POST");
const message = useMessage();
const store = useStore();
const username = ref("");
const password = ref("");
const usernameStatus = ref<"error" | "success">("success");
const passwordStatus = ref<"error" | "success">("success");
const usernameFeedback = ref("");
const passwordFeedback = ref("");
const teacher = inject(TEACHER_INJECTION_KEY);

async function login() {
   usernameStatus.value = "success";
   passwordStatus.value = "success";
   usernameFeedback.value = "";
   passwordFeedback.value = "";
   try {
      const result = await postLogin.execute({
         body: {
            username: username.value,
            password: password.value,
         },
      });

      if (teacher) {
         teacher.value = result.data?.teacher ?? null;
      }

      router.push("/dashboard");
   } catch {
      if (!postLogin.error) {
         return;
      }

      if (!postLogin.error.fieldErrors) {
         message.error(postLogin.error.message);
         return;
      }

      const fieldErrors = postLogin.error.fieldErrors;
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
</script>

<style scoped></style>
