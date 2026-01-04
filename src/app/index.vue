<template>
   <NConfigProvider
      class="h-full"
      :theme="theme === 'light' ? lightTheme : darkTheme"
      :theme-overrides="
         theme === 'light' ? lightThemeOverrides : darkThemeOverrides
      "
   >
      <NMessageProvider placement="bottom-left" closable keep-alive-on-hover>
         <RouterView />
      </NMessageProvider>
      <NGlobalStyle />
      <EvidenceProvider />
   </NConfigProvider>
</template>

<script setup lang="ts">
import "vfonts/Inter.css";
import {
   NConfigProvider,
   NGlobalStyle,
   lightTheme,
   darkTheme,
   NMessageProvider,
} from "naive-ui";
import { KeepAlive, ref, watchEffect } from "vue";
import { RouterView } from "vue-router";
import { darkThemeOverrides, lightThemeOverrides } from "@/lib/theme-overrides";
import EvidenceProvider from "./components/evidence-provider.vue";

const theme = ref<"light" | "dark">("dark");

watchEffect(() => {
   if (theme.value === "dark") {
      document.documentElement.classList.add("dark");
   } else {
      document.documentElement.classList.remove("dark");
   }
});
</script>
