<template>
   <NTooltip placement="bottom">
      <template #trigger>
         <NIcon>
            <PhInfo :color="themeVars.textColor3" />
         </NIcon>
      </template>
      <div class="max-w-[500px]">
         <slot></slot>
      </div>
   </NTooltip>
</template>

<script setup lang="ts">
import { PhInfo } from "@phosphor-icons/vue";
import { NTooltip, NIcon, useThemeVars } from "naive-ui";

const themeVars = useThemeVars();
</script>
