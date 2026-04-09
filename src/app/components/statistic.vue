<template>
   <div
      class="flex flex-col"
      :class="{
         'size-full': exclusive,
      }"
   >
      <NText
         :depth="3"
         class="flex items-center gap-1"
         :class="{
            'text-xs': props.size === 'small' || props.size === 'medium',
            'text-sm': props.size === 'large',
         }"
         v-bind="titleProps"
      >
         <slot name="title-prefix"></slot>
         {{ title }}
         <slot name="title-suffix"></slot>
      </NText>
      <div
         class="flex flex-row items-center gap-1"
         :class="{
            'justify-center': exclusive,
            'w-full': exclusive,
            'h-full': exclusive,
         }"
      >
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
               'text-4xl': exclusive,
            }"
            :style="{
               color: exclusive ? themeVars.primaryColor : 'currentColor',
            }"
         >
            <slot>
               {{ props.value ?? "" }}
            </slot>
         </NText>
      </div>
      <NText v-if="!!description?.length" class="text-xs mt-auto" :depth="3">
         {{ description }}
      </NText>
   </div>
</template>

<script setup lang="ts">
import { IconProps, NIcon, NText, TextProps, useThemeVars } from "naive-ui";

const props = withDefaults(
   defineProps<{
      title: string;
      description?: string;
      value?: string | number;
      size?: "small" | "medium" | "large";
      valueProps?: TextProps;
      iconProps?: IconProps;
      titleProps?: TextProps;
      exclusive?: boolean;
   }>(),
   {
      size: "small",
   },
);

const themeVars = useThemeVars();
</script>
