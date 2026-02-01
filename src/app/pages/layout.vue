<template>
   <NLayout embedded>
      <div class="flex flex-col w-screen h-screen">
         <nav class="relative z-50">
            <div
               class="container mx-auto h-16 flex items-center justify-between"
            >
               <RouterLink to="/">
                  <img
                     :src="`/distract-text-${theme != 'light' ? 'light' : 'dark'}.svg`"
                     class="h-8 pointer-events-none"
                  />
               </RouterLink>
               <div class="flex items-center">
                  <template v-for="link in links" :key="link.to">
                     <RouterLink
                        v-if="!link.isHidden"
                        :to="link.to"
                        class="px-2"
                     >
                        <NButton
                           :secondary="link.isActive"
                           :quaternary="!link.isActive"
                           :focusable="false"
                           size="small"
                        >
                           <NText :depth="link.isActive ? 1 : 3">
                              {{ link.label }}
                           </NText>
                        </NButton>
                     </RouterLink>
                  </template>
                  <div v-if="auth.isAuthenticated" class="flex items-center">
                     <NDivider vertical class="mx-4!" />
                     <NPopselect
                        trigger="click"
                        :options="userMenuOptions"
                        @update:value="onUpdateUserMenu"
                     >
                        <NButton circle>
                           <template #icon>
                              <PhUser />
                           </template>
                        </NButton>
                     </NPopselect>
                  </div>
                  <div v-else class="flex items-center">
                     <NButton circle quaternary @click="toggleTheme">
                        <template #icon>
                           <PhMoon v-if="theme === 'dark'" />
                           <PhSunDim v-else />
                        </template>
                     </NButton>
                  </div>
               </div>
            </div>
         </nav>
         <div class="container mx-auto flex flex-col flex-1">
            <RouterView></RouterView>
         </div>
      </div>
   </NLayout>
</template>

<script setup lang="ts">
import {
   NButton,
   NText,
   NDivider,
   NLayout,
   NLayoutContent,
   NLayoutHeader,
   NPopselect,
   useThemeVars,
   NIcon,
} from "naive-ui";
import { computed, h, inject, reactive } from "vue";
import { useRoute, RouterLink, RouterView } from "vue-router";
import { isUrlRelatedToParent } from "@/lib/url";
import { THEME_INJECTION_KEY } from "@/lib/injection-keys";
import { PhUser, PhMoon, PhSunDim } from "@phosphor-icons/vue";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { useAuthStore } from "../composables/use-auth-store";

const route = useRoute();
const auth = useAuthStore();
const themeVars = useThemeVars();
const theme = inject(THEME_INJECTION_KEY)!;

const links = reactive([
   {
      label: "Home",
      to: "/",
      isActive: computed(() => isUrlRelatedToParent(route.path, "/")),
   },
   {
      label: "Dashboard",
      to: "/dashboard",
      isActive: computed(() => isUrlRelatedToParent(route.path, "/dashboard")),
      isHidden: computed(() => !auth.isAuthenticated),
   },
   {
      label: "Login",
      to: "/login",
      isActive: computed(() => isUrlRelatedToParent(route.path, "/login")),
      isHidden: computed(() => !!auth.isAuthenticated),
   },
   {
      label: "Register",
      to: "/register",
      isActive: computed(() => isUrlRelatedToParent(route.path, "/register")),
      isHidden: computed(() => !!auth.isAuthenticated),
   },
]);

const userMenuOptions = reactive([
   {
      label: "Profile",
      render({ node }: any) {
         return h(RouterLink, { to: "/profile" }, { default: () => node });
      },
   },
   {
      label: computed(
         () => `${theme.value === "light" ? "Dark" : "Light"} Theme`,
      ),
      value: "switch-theme",
   },
   {
      render() {
         return h(NDivider, { class: "my-1!" });
      },
   },
   {
      label: "Logout",
      value: "logout",
   },
] as SelectMixedOption[]);

function onUpdateUserMenu(value: string) {
   if (value === "logout") {
      auth.logout();
   } else if (value === "switch-theme") {
      toggleTheme();
   }
}

function toggleTheme() {
   theme.value = theme.value === "light" ? "dark" : "light";
}
</script>

<style scoped>
nav {
   background-color: v-bind("themeVars.cardColor");
   border-bottom: 1px solid v-bind("themeVars.dividerColor");
}
</style>
