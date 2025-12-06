<template>
  <NConfigProvider
    class="h-full"
    :theme="theme === 'light' ? lightTheme : darkTheme"
    :theme-overrides="
      theme === 'light' ? lightThemeOverrides : darkThemeOverrides
    "
  >
    <RouterView />
    <NGlobalStyle />
  </NConfigProvider>
</template>

<script setup lang="ts">
import "vfonts/Inter.css";
import { NConfigProvider, NGlobalStyle, lightTheme, darkTheme } from "naive-ui";
import { ref } from "vue";
import { RouterView } from "vue-router";
import { darkThemeOverrides, lightThemeOverrides } from "@/lib/theme-overrides";

const theme = ref<"light" | "dark">("dark");
</script>
