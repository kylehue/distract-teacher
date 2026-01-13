<template>
   <Layout title="Reports">
      <div class="flex flex-col items-center justify-center h-full w-full gap-4">
         <NText class="text-xl">Pick the type of reports to generate:</NText>
         <div class="flex gap-2">
            <NButton class="h-fit! w-[150px]! p-4!" tertiary>
               <div class="flex flex-col items-center justify-center gap-2">
                  <PhVideoConference :size="32" />
                  <NText>Room Reports</NText>
               </div>
            </NButton>
            <NButton class="h-fit! w-[150px]! p-4!" tertiary>
               <div class="flex flex-col items-center justify-center gap-2">
                  <PhUser :size="32" />
                  <NText>Student Reports</NText>
               </div>
            </NButton>
         </div>
      </div>
   </Layout>
</template>

<script setup lang="ts">
import { NButton, NText } from "naive-ui";
import Layout from "./layout.vue";
import { PhUser, PhVideoConference } from "@phosphor-icons/vue";
</script>
