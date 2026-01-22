<template>
   <div
      class="flex flex-col items-start justify-center w-full h-full mt-42 gap-4"
   >
      <NText class="text-7xl font-bold">
         Supporting academic integrity through behavioral analysis.
      </NText>
      <NText class="text-2xl" :depth="3">
         <span>Distract</span> helps institutions evaluate
         assessment conduct with transparency.
      </NText>

      <div class="flex items-center gap-2">
         <RouterLink to="/register">
            <NButton type="primary" size="large">
               Get Started
            </NButton>
         </RouterLink>
         <NButton size="large">
            <template #icon>
               <PhDownloadSimple />
            </template>
            Download Student Client
         </NButton>
      </div>
   </div>
</template>

<script setup lang="ts">
import { PhDownload, PhDownloadSimple } from "@phosphor-icons/vue";
import { NButton, NText } from "naive-ui";
import { RouterLink } from "vue-router";
</script>
