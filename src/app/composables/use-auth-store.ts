import { ref } from "vue";
import type { TeacherInfo } from "@/lib/typings";
import { defineStore } from "pinia";
import { useFetch } from "./use-fetch";
import { useRouter } from "vue-router";
import { useStore } from "./use-store";

export const useAuthStore = defineStore("auth-store", () => {
   const isAuthenticated = ref(false);
   const isLoading = ref(false);
   const teacher = ref<TeacherInfo | null>(null);
   const router = useRouter();
   const store = useStore();

   const postLogin = useFetch<{ teacher: TeacherInfo }>("/api/login", "POST");
   async function loginWithCredentials(username: string, password: string) {
      isLoading.value = true;
      try {
         const result = await postLogin.execute({
            body: {
               username: username,
               password: password,
            },
         });

         isAuthenticated.value = true;
         teacher.value = result.data!.teacher;
         store.upsertTeachers([result.data!.teacher]);

         router.push("/dashboard");

         return result;
      } catch (e) {
         throw e;
      } finally {
         isLoading.value = false;
      }
   }

   const postValidateSession = useFetch<{
      teacher: TeacherInfo;
   }>("/api/validate_session", "POST");
   async function loginWithCookie() {
      isLoading.value = true;
      try {
         const result = await postValidateSession.execute();
         isAuthenticated.value = true;
         teacher.value = result.data!.teacher;
         store.upsertTeachers([result.data!.teacher]);
         return result;
      } catch (e) {
         throw e;
      } finally {
         isLoading.value = false;
      }
   }

   const postLogout = useFetch("/api/logout", "POST");
   async function logout() {
      isLoading.value = true;
      try {
         await postLogout.execute();
         router.push("/login");
         teacher.value = null;
         isAuthenticated.value = false;
         store.clear();
      } catch {
         router.push("/login");
         teacher.value = null;
         isAuthenticated.value = false;
         store.clear();
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
