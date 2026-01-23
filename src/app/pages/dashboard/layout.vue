<template>
   <NLayout class="w-full h-full" embedded>
      <NLayoutContent
         class="w-full h-full"
         content-class="flex flex-col p-8"
         embedded
      >
         <div class="flex flex-row items-center justify-between mb-8">
            <div class="flex items-center">
               <NText v-if="!!title" strong class="text-lg">
                  {{ title }}
               </NText>
               <slot name="header"></slot>
            </div>
            <div class="flex items-center">
               <slot name="header-extra"></slot>
            </div>
         </div>
         <NDivider v-if="!noDivider" class="m-0!" />
         <div class="flex flex-col h-full">
            <div class="w-full h-4 flex-none"></div>
            <slot></slot>
            <div class="w-full h-8 flex-none"></div>
         </div>
      </NLayoutContent>
   </NLayout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutContent, NText, NDivider } from "naive-ui";
import { onMounted } from "vue";
const props = defineProps<{
   title?: string;
   noDivider?: boolean;
}>();
</script>
