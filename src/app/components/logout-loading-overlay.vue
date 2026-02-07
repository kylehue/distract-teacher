<template>
   <NCard
      class="absolute! inset-0 w-screen h-screen z-9999! rounded-none!"
      content-class="flex items-center justify-center"
      :bordered="false"
      shadow="none"
   >
      <Loader text="Logging out..." />
   </NCard>
</template>

<script setup lang="ts">
import { NCard, NText } from "naive-ui";
import Loader from "@/app/components/loader.vue"
</script>
