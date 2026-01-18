<template>
   <NLayout class="w-full h-full" embedded>
      <NLayoutHeader bordered>
         <div class="container mx-auto py-4 flex items-center justify-between">
            <RouterLink to="/">
               <NText>Distract</NText>
            </RouterLink>
            <div class="flex items-center">
               <template v-for="link in links" :key="link.to">
                  <RouterLink v-if="!link.isHidden" :to="link.to" class="px-2">
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
               <div v-if="!!teacher" class="flex items-center">
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
            </div>
         </div>
      </NLayoutHeader>
      <NLayoutContent
         class="container mx-auto"
         content-class="flex flex-col"
         embedded
      >
         <RouterView></RouterView>
      </NLayoutContent>
   </NLayout>
</template>

<script setup lang="ts">
import {
   NButton,
   NTabs,
   NTab,
   NSpin,
   NText,
   NDivider,
   NLayout,
   NLayoutContent,
   NLayoutHeader,
   NPopselect,
} from "naive-ui";
import { computed, h, inject, reactive } from "vue";
import { useRoute, RouterLink, RouterView } from "vue-router";
import { isUrlRelatedToParent } from "@/lib/url";
import {
   TEACHER_INJECTION_KEY,
   THEME_INJECTION_KEY,
   LOGOUT_INJECTION_KEY,
} from "@/lib/injection-keys";
import { PhUser } from "@phosphor-icons/vue";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";

const route = useRoute();
const teacher = inject(TEACHER_INJECTION_KEY)!;
const theme = inject(THEME_INJECTION_KEY)!;
const logout = inject(LOGOUT_INJECTION_KEY)!;

const links = reactive([
   {
      label: "Home",
      to: "/",
      isActive: computed(() => isUrlRelatedToParent(route.path, "/home")),
   },
   {
      label: "Dashboard",
      to: "/dashboard",
      isActive: computed(() => isUrlRelatedToParent(route.path, "/dashboard")),
      isHidden: computed(() => !teacher.value),
   },
   {
      label: "Login",
      to: "/login",
      isActive: computed(() => isUrlRelatedToParent(route.path, "/login")),
      isHidden: computed(() => !!teacher.value),
   },
   {
      label: "Register",
      to: "/register",
      isActive: computed(() => isUrlRelatedToParent(route.path, "/register")),
      isHidden: computed(() => !!teacher.value),
   },
]);

const userMenuOptions = reactive([
   { label: "Profile", value: "profile" },
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
      logout.execute();
   } else if (value === "switch-theme") {
      theme.value = theme.value === "light" ? "dark" : "light";
   }
}
</script>
