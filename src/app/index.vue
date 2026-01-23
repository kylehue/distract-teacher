<template>
   <NConfigProvider
      class="h-full"
      :theme="theme === 'light' ? lightTheme : darkTheme"
      :theme-overrides="
         theme === 'light' ? lightThemeOverrides : darkThemeOverrides
      "
   >
      <NDialogProvider>
         <NMessageProvider
            ref="message"
            placement="bottom-left"
            closable
            keep-alive-on-hover
         >
            <RouterView />
            <EvidenceProvider />
            <CreateRoomProvider />
            <AnnouncementProvider />
         </NMessageProvider>
      </NDialogProvider>
      <NGlobalStyle />
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
   NDialogProvider,
} from "naive-ui";
import { onMounted, provide, ref, watchEffect } from "vue";
import { RouterView } from "vue-router";
import { darkThemeOverrides, lightThemeOverrides } from "@/lib/theme-overrides";
import EvidenceProvider from "./components/evidence-provider.vue";
import CreateRoomProvider from "./components/create-room-provider.vue";
import AnnouncementProvider from "./components/announcement-provider.vue";
import { THEME_INJECTION_KEY } from "@/lib/injection-keys";
import { useAuthStore } from "./composables/use-auth-store";

const auth = useAuthStore();
const theme = ref<"light" | "dark">(
   localStorage.getItem("theme") === "dark" ? "dark" : "light",
);

// theme watcher
watchEffect(() => {
   if (theme.value === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
   } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
   }
});

// try auto login on mount
onMounted(async () => {
   try {
      await auth.loginWithCookie();
   } catch {
      // we don't care about errors here
   }
});

provide(THEME_INJECTION_KEY, theme);
</script>
