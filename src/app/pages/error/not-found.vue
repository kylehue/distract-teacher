<template>
   <div class="flex items-center justify-center w-full h-full">
      <div class="flex items-center gap-8">
         <!-- Illustration for 404 -->
         <NImage
            src="/page-eaten.svg"
            class="w-[330px]"
            preview-disabled
         ></NImage>

         <div class="flex flex-col gap-2 items-start max-w-[400px]">
            <NText class="text-xl font-medium">Page Not Found</NText>
            <NText>
               Oops! The page you are looking for does not exist. It might have
               been removed or the URL is incorrect.
            </NText>

            <NButton @click="$router.back()">Go back</NButton>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { NButton, NText, NImage } from "naive-ui";
import { RouterLink } from "vue-router";
</script>
