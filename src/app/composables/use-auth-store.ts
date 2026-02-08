import { ref } from "vue";
import type { TeacherInfo } from "@/lib/typings";
import { defineStore } from "pinia";
import { useFetch } from "./use-fetch";
import { useRouter } from "vue-router";
import { useStore } from "./use-store";
import { getSocket } from "@/plugins/socket";

export const useAuthStore = defineStore("auth-store", () => {
   const isAuthenticated = ref(false);
   const isLoading = ref(false);
   const teacher = ref<TeacherInfo | null>(null);
   const router = useRouter();
   const store = useStore();

   function refreshSocket() {
      const socket = getSocket();
      if (socket.connected) socket.disconnect();
      socket.connect();
   }

   const postLogin = useFetch<{ teacher: TeacherInfo }>("/api/login", "POST");
   async function loginWithCredentials(username: string, password: string) {
      if (isAuthenticated.value) return;
      isLoading.value = true;
      try {
         const data = await postLogin.execute({
            body: {
               username: username,
               password: password,
            },
         });
         refreshSocket();
         teacher.value = data.data!.teacher;
         isAuthenticated.value = true;

         router.replace("/dashboard");
      } catch (e) {
         throw e;
      } finally {
         isLoading.value = false;
      }
   }

   const postValidateSession = useFetch<{ teacher: TeacherInfo }>(
      "/api/validate_session",
      "POST",
   );
   async function loginWithCookie() {
      if (isAuthenticated.value) return;
      isLoading.value = true;
      try {
         const data = await postValidateSession.execute();
         refreshSocket();
         teacher.value = data.data!.teacher;
         isAuthenticated.value = true;
         openPage();
      } catch (e) {
         throw e;
      } finally {
         isLoading.value = false;
      }
   }

   function openPage() {
      const unsafePaths = new Set(["/login", "/register"]);
      if (unsafePaths.has(router.currentRoute.value.path)) {
         router.replace("/dashboard");
      }
   }

   function closePage() {
      const safePaths = new Set(["/", "/home", "/login", "/register"]);
      if (!safePaths.has(router.currentRoute.value.path)) {
         router.replace("/login");
      }
      store.clear();
   }

   const postLogout = useFetch("/api/logout", "POST");
   async function logout() {
      isLoading.value = true;
      try {
         await postLogout.execute();
         const socket = getSocket();
         socket.disconnect();
         teacher.value = null;
         isAuthenticated.value = false;
         closePage();
      } catch (e) {
         throw e;
      } finally {
         isLoading.value = false;
      }
   }

   return {
      isAuthenticated,
      isLoading,
      teacher,
      loginWithCredentials,
      loginWithCookie,
      logout,
      postLogin,
      postLogout,
      postValidateSession,
   };
});
