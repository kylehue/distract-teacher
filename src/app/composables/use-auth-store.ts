import { ref } from "vue";
import type { TeacherInfo } from "@/lib/typings";
import { defineStore } from "pinia";
import { useFetch } from "./use-fetch";
import { useRouter } from "vue-router";
import { useStore } from "./use-store";
import { useSocket } from "./use-socket";

export const useAuthStore = defineStore("auth-store", () => {
   const isAuthenticated = ref(false);
   const isLoading = ref(false);
   const teacher = ref<TeacherInfo | null>(null);
   const router = useRouter();
   const store = useStore();
   const socket = useSocket();

   const postLogin = useFetch("/api/login", "POST");
   async function loginWithCredentials(username: string, password: string) {
      isLoading.value = true;
      try {
         await postLogin.execute({
            body: {
               username: username,
               password: password,
            },
         });

         router.push("/dashboard");
      } catch (e) {
         throw e;
      } finally {
         isLoading.value = false;
      }
   }

   const postValidateSession = useFetch("/api/validate_session", "POST");
   async function loginWithCookie() {
      isLoading.value = true;
      try {
         await postValidateSession.execute();
      } catch (e) {
         throw e;
      } finally {
         isLoading.value = false;
      }
   }

   function openPage() {
      const unsafePaths = new Set(["/login", "/register"]);
      if (unsafePaths.has(router.currentRoute.value.path)) {
         router.push("/");
      }
   }

   function closePage() {
      const safePaths = new Set(["/", "/home", "/login", "/register"]);
      if (!safePaths.has(router.currentRoute.value.path)) {
         router.push("/login");
      }
      store.clear();
   }

   const postLogout = useFetch("/api/logout", "POST");
   async function logout() {
      isLoading.value = true;
      try {
         await postLogout.execute();
      } catch (e) {
         throw e;
      } finally {
         isLoading.value = false;
      }
   }

   socket.on(
      "teacher:set_account",
      (data) => {
         teacher.value = data.teacher;
         isAuthenticated.value = true;
         openPage();
      },
      { autoClean: false },
   );

   socket.on(
      "teacher:unset_account",
      () => {
         teacher.value = null;
         isAuthenticated.value = false;
         closePage();
      },
      { autoClean: false },
   );

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
