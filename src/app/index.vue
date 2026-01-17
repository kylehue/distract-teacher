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
   useMessage,
} from "naive-ui";
import {
   computed,
   KeepAlive,
   onMounted,
   provide,
   reactive,
   ref,
   useTemplateRef,
   watchEffect,
} from "vue";
import { RouterView, useRouter } from "vue-router";
import { darkThemeOverrides, lightThemeOverrides } from "@/lib/theme-overrides";
import { useFetch } from "./composables/use-fetch";
import EvidenceProvider from "./components/evidence-provider.vue";
import CreateRoomProvider from "./components/create-room-provider.vue";
import { TeacherInfo } from "@/lib/typings";
import {
   LOGOUT_INJECTION_KEY,
   TEACHER_INJECTION_KEY,
   THEME_INJECTION_KEY,
} from "@/lib/injection-keys";
import { useStore } from "./composables/use-store";

const postValidateSession = useFetch<{
   teacher: TeacherInfo;
}>("/api/validate_session", "POST");
const teacher = ref<TeacherInfo | null>(null);
const router = useRouter();
const theme = ref<"light" | "dark">(
   localStorage.getItem("theme") === "dark" ? "dark" : "light",
);

// logout function
const store = useStore();
const message = useTemplateRef("message");
const postLogout = useFetch("/api/logout", "POST");
async function logout() {
   try {
      await postLogout.execute();
      router.push("/login");
      teacher.value = null;
      store.clear();
      message.value?.create("You have been logged out.");
   } catch {
      router.push("/login");
      teacher.value = null;
      store.clear();
      message.value?.error("Something went wrong logging out.");
   }
}

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
      const result = await postValidateSession.execute();
      teacher.value = result.data?.teacher ?? null;
      if (!router.currentRoute.value.path.startsWith("/dashboard")) {
         router.push("/dashboard");
      }
   } catch {
      // we don't care about errors here
   }
});

provide(TEACHER_INJECTION_KEY, teacher);
provide(THEME_INJECTION_KEY, theme);
provide(LOGOUT_INJECTION_KEY, {
   execute: logout,
   isLoading: computed(() => postLogout.isLoading),
});
</script>
