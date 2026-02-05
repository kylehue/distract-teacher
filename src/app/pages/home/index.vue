<template>
   <div
      class="absolute left-0 flex justify-center w-screen h-[calc(100vh-4rem)]"
   >
      <LightCanvas />
      <div class="container flex items-center">
         <div
            class="flex flex-col items-start justify-center gap-4 w-full h-full z-1"
         >
            <NText class="text-4xl md:text-5xl lg:text-6xl font-bold">
               Supporting academic integrity through behavioral analysis.
            </NText>
            <NText class="text-xl md:text-2xl" :depth="3">
               <span>Distract</span> helps institutions evaluate assessment
               conduct with transparency.
            </NText>

            <div class="flex flex-col md:flex-row gap-2">
               <RouterLink to="/register">
                  <NButton type="primary" size="large"> Get Started </NButton>
               </RouterLink>
               <a :href="latestExeUrl || '#'">
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
   </div>
</template>

<script setup lang="ts">
import { PhDownloadSimple } from "@phosphor-icons/vue";
import { NButton, NText } from "naive-ui";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import LightCanvas from "./components/light-canvas.vue";

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
