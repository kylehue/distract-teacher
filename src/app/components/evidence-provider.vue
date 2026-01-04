<template>
   <NModal v-model:show="isShowing" closable>
      <NCard
         title="Evidence"
         closable
         @close="hide"
         class="w-fit! min-w-[300px] min-h-[200px]"
         content-class="flex items-center justify-center w-full h-full"
      >
         <NSpin v-if="isLoading" />
         <NEmpty v-else-if="!monitorLog" description="Not found" />
         <div v-else class="flex flex-col w-full h-full">
            
            <video
               class="max-w-[80vw] max-h-[70vh] min-w-[320px] min-h-[180px] rounded object-contain"
               controls
            >
               <source :src="monitorLog.recordingUrl" type="video/mp4" />
            </video>
         </div>
      </NCard>
   </NModal>
</template>

<script setup lang="ts">
import { NModal, NCard, NSpin, NEmpty } from "naive-ui";
import { useEvidence } from "@/app/composables/use-evidence";

const { isShowing, isLoading, hide, monitorLog } = useEvidence();
</script>
