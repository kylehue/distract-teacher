<template>
   <div class="flex flex-col">
      <NText
         :depth="3"
         :class="{
            'text-xs': props.size === 'small' || props.size === 'medium',
            'text-sm': props.size === 'large',
         }"
         v-bind="titleProps"
      >
         {{ title }}
      </NText>
      <div class="flex flex-row items-center gap-1">
         <NIcon
            v-if="$slots.icon"
            v-bind="iconProps"
            :size="
               props.size === 'small' ? 18 : props.size === 'medium' ? 20 : 24
            "
         >
            <slot name="icon"></slot>
         </NIcon>
         <NText
            v-bind="valueProps"
            :class="{
               'text-lg': props.size === 'small',
               'text-xl': props.size === 'medium',
               'text-2xl': props.size === 'large',
            }"
         >
            <slot>
               {{ props.value ?? "" }}
            </slot>
         </NText>
      </div>
   </div>
</template>

<script setup lang="ts">
import { IconProps, NIcon, NText, TextProps } from "naive-ui";

const props = withDefaults(
   defineProps<{
      title: string;
      value?: string | number;
      size?: "small" | "medium" | "large";
      valueProps?: TextProps;
      iconProps?: IconProps;
      titleProps?: TextProps;
   }>(),
   {
      size: "small",
   },
);
</script>
