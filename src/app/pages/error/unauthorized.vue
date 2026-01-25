<template>
   <div class="flex items-center justify-center w-full h-full">
      <div class="flex items-center gap-8">
         <NImage
            src="/happy-music.svg"
            class="w-[330px]"
            preview-disabled
         ></NImage>
         <div class="flex flex-col gap-2 items-start max-w-[400px]">
            <NText class="text-xl font-medium"> Unauthorized Access </NText>
            <NText>
               You don't have permission to view this page. Please log in or
               return to a page you're allowed to access.
            </NText>
            <RouterLink to="/login">
               <NButton>Go to Login Page</NButton>
            </RouterLink>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { NButton, NText, NImage } from "naive-ui";
import { RouterLink } from "vue-router";
</script>
