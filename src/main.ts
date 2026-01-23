import { createApp } from "vue";
import { createPinia } from "pinia";
import "./styles/main.css";
import App from "./app/index.vue";
import SocketPlugin from "@/plugins/socket";
import { router } from "./lib/router";
import { ForbiddenError, NotFoundError, UnauthorizedError } from "./lib/errors";

const app = createApp(App);
const pinia = createPinia();
app.use(SocketPlugin);
app.use(router);
app.use(pinia);
app.mount("#app");

app.config.errorHandler = (err) => {
   if (err instanceof UnauthorizedError) {
      router.push("/unauthorized");
   } else if (err instanceof ForbiddenError) {
      router.push("/forbidden");
   } else if (err instanceof NotFoundError) {
      router.push("/not-found");
   } else {
      console.error("Unexpected error", err);
   }
};
