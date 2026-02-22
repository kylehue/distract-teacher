<template>
   <div class="flex items-center justify-center w-full h-full">
      <Canvas />
      <div
         class="flex flex-col items-center md:items-start justify-center gap-4 w-full h-full z-1"
      >
         <NText class="text-4xl md:text-5xl lg:text-6xl font-bold text-center md:text-start">
            Supporting academic integrity through behavioral analysis.
         </NText>
         <NText class="text-xl md:text-2xl text-center md:text-start" :depth="3">
            <span>Distract</span> helps institutions evaluate assessment conduct
            with transparency.
         </NText>

         <div class="flex flex-col md:flex-row gap-2 items-start w-fit mt-8">
            <RouterLink class="w-full md:w-auto" to="/register">
               <NButton type="primary" size="large" class="w-full!"> Get Started </NButton>
            </RouterLink>
            <a class="w-full md:w-auto" :href="latestExeUrl || '#'">
               <NButton size="large">
                  <template #icon>
                     <PhDownloadSimple />
                  </template>
                  Download Student Client
               </NButton>
            </a>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { PhDownloadSimple } from "@phosphor-icons/vue";
import { NButton, NText } from "naive-ui";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import Canvas from "./canvas.vue";

async function getLatestExeUrl(): Promise<string | null> {
   const res = await fetch(
      "https://api.github.com/repos/kylehue/distract/releases/latest",
   );
   const release = await res.json();
   const exeAsset = release.assets.find((a: any) => a.name.endsWith(".exe"));
   return exeAsset?.browser_download_url || null;
}

const latestExeUrl = ref<string | null>(null);

onMounted(async () => {
   latestExeUrl.value = await getLatestExeUrl();
});
</script>
