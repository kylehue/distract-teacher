<template>
   <NCard
      class="absolute! inset-0 w-screen h-screen z-9999! rounded-none!"
      content-class="flex items-center justify-center"
      :bordered="false"
      shadow="none"
   >
      <div class="flex items-center gap-2">
         <NSpin />
         <NText> Logging out... </NText>
      </div>
   </NCard>
</template>

<script setup lang="ts">
import { NCard, NText, NSpin } from "naive-ui";
</script>
