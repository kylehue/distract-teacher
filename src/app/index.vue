<template>
  <NConfigProvider
    class="h-full"
    :theme="theme === 'light' ? lightTheme : darkTheme"
    :theme-overrides="
      theme === 'light' ? lightThemeOverrides : darkThemeOverrides
    "
  >
    <RouterView></RouterView>
    <NGlobalStyle></NGlobalStyle>
  </NConfigProvider>
</template>

<script setup lang="ts">
import "vfonts/Inter.css";
import { NConfigProvider, NGlobalStyle, lightTheme, darkTheme } from "naive-ui";
import { ref } from "vue";
import { RouterView } from "vue-router";

// Theme overrides
const lightThemeOverrides = {
  common: {
    primaryColor: "#8661ff",
    primaryColorHover: "#a27dff",
    primaryColorPressed: "#7e3ee6",
    primaryColorSuppl: "rgb(64, 40, 143)",
  },
};

const darkThemeOverrides = {
  common: {
    primaryColor: "#a27dff",
    primaryColorHover: "#af8fff",
    primaryColorPressed: "#9b61ff",
    primaryColorSuppl: "rgb(94, 67, 161)",
  },
};

const theme = ref<"light" | "dark">("dark");
</script>
