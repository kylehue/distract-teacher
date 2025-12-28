import { ref, readonly } from "vue";
import type { App } from "vue";
import { getSocket } from "./socket";
import { router } from "@/lib/router";

const sessionToken = ref<string | null>(null);

export default {
   install(app: App) {
      const socket = getSocket();

      if (!socket) {
         throw new Error(
            "Socket not initialized. Install the socket plugin before the auth plugin."
         );
      }

      const savedSessionToken = localStorage.getItem("sessionToken");
      if (savedSessionToken) {
         sessionToken.value = savedSessionToken;
         socket.emit("teacher:validate_session", {
            sessionToken: savedSessionToken,
         });
      }

      socket.on("teacher:login_success", (data) => {
         sessionToken.value = data.sessionToken;
         localStorage.setItem("sessionToken", data.sessionToken);
         if (!router.currentRoute.value.path.startsWith("/dashboard")) {
            router.push("/dashboard");
         }
      });

      socket.on("teacher:logout_success", () => {
         sessionToken.value = null;
         localStorage.removeItem("sessionToken");
         router.push("/");
      });

      app.provide("sessionToken", readonly(sessionToken));
   },
};
