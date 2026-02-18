import { ref } from "vue";

const isShowing = ref(false);

export function useNotification() {
   function show() {
      isShowing.value = true;
   }

   function hide() {
      isShowing.value = false;
   }

   return { isShowing, show, hide };
}
