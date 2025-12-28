import { createApp } from "vue";
import "./styles/main.css";
import App from "./app/index.vue";
import SocketPlugin from "@/plugins/socket";
import AuthPlugin from "@/plugins/auth";
import { router } from "./lib/router";

const app = createApp(App);
app.use(SocketPlugin);
app.use(AuthPlugin);
app.use(router);
app.mount("#app");
