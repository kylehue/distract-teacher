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
         <EvidenceProvider />
         <CreateRoomProvider />
      </NMessageProvider>
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
} from "naive-ui";
import { KeepAlive, onMounted, ref, watchEffect } from "vue";
import { RouterView, useRouter } from "vue-router";
import { darkThemeOverrides, lightThemeOverrides } from "@/lib/theme-overrides";
import { useFetch } from "./composables/use-fetch";
import EvidenceProvider from "./components/evidence-provider.vue";
import CreateRoomProvider from "./components/create-room-provider.vue";

const fetchValidateSession = useFetch("/api/validate_session");
const router = useRouter();
const theme = ref<"light" | "dark">("dark");

watchEffect(() => {
   if (theme.value === "dark") {
      document.documentElement.classList.add("dark");
   } else {
      document.documentElement.classList.remove("dark");
   }
});

// try auto login on mount
onMounted(async () => {
   try {
      await fetchValidateSession.execute({ method: "POST" });
      if (!router.currentRoute.value.path.startsWith("/dashboard")) {
         router.push("/dashboard");
      }
   } catch {
      // we don't care about errors here
   }
});
</script>
