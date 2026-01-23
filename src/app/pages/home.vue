<template>
   <div
      class="flex flex-col items-start justify-center w-full h-full mt-42 gap-4"
   >
      <NText class="text-7xl font-bold">
         Supporting academic integrity through behavioral analysis.
      </NText>
      <NText class="text-2xl" :depth="3">
         <span>Distract</span> helps institutions evaluate assessment conduct
         with transparency.
      </NText>

      <div class="flex items-center gap-2">
         <RouterLink to="/register">
            <NButton type="primary" size="large"> Get Started </NButton>
         </RouterLink>
         <a v-if="typeof latestExeUrl === 'string'" :href="latestExeUrl">
            <NButton size="large">
               <template #icon>
                  <PhDownloadSimple />
               </template>
               Download Student Client
            </NButton>
         </a>
      </div>
   </div>
</template>

<script setup lang="ts">
import { PhDownloadSimple } from "@phosphor-icons/vue";
import { NButton, NText } from "naive-ui";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

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
