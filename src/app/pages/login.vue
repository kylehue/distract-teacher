<template>
   <div class="flex items-center justify-center h-screen">
      <NCard class="flex w-[420px]!" title="Login">
         <NForm>
            <NFormItem label="Username">
               <NInput
                  v-model:value="username"
                  placeholder="Enter your username"
               />
            </NFormItem>

            <NFormItem label="Password">
               <NInput
                  v-model:value="password"
                  type="password"
                  placeholder="Enter your password"
               />
            </NFormItem>

            <div class="flex flex-col items-start gap-4">
               <NButton type="primary" block> Login </NButton>
               <NButton type="tertiary" text block>
                  Don't have an account? Register
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
const password = ref("");
</script>

<style scoped></style>
