<template>
   <div class="flex items-center justify-center w-full h-full">
      <div class="flex items-center gap-8">
         <NImage
            src="/public/happy-music.svg"
            class="w-[330px]"
            preview-disabled
         ></NImage>

         <div class="flex flex-col gap-2 items-start max-w-[400px]">
            <NText class="text-xl font-medium">Access Forbidden</NText>
            <NText>
               You do not have permission to view this page. Please contact your
               administrator or return to a page you're allowed to access.
            </NText>

            <NButton @click="$router.back()">Go back</NButton>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { NButton, NText, NImage } from "naive-ui";
</script>
