<template>
   <div class="flex items-center justify-center h-screen">
      <NCard class="flex w-[420px]!" title="Register">
         <NForm>
            <NFormItem label="Username">
               <NInput
                  v-model:value="username"
                  placeholder="Enter your username"
               />
            </NFormItem>

            <NFormItem label="Password">
               <NInput
                  v-model:value="password1"
                  type="password"
                  placeholder="Enter your password"
               />
            </NFormItem>

            <NFormItem label="Confirm Password">
               <NInput
                  v-model:value="password2"
                  type="password"
                  placeholder="Enter your password again"
               />
            </NFormItem>

            <div class="flex flex-col items-start gap-4">
               <NButton type="primary" block> Register </NButton>
               <NButton type="tertiary" text block>
                  Already have an account? Login
               </NButton>
            </div>
         </NForm>
      </NCard>
   </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NCard, NForm, NFormItem, NInput, NButton } from "naive-ui";

const username = ref("");
const password1 = ref("");
const password2 = ref("");
</script>

<style scoped></style>
