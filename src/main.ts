import { createApp } from "vue";
import { createPinia } from "pinia";
import "./styles/main.css";
import App from "./app/index.vue";
import SocketPlugin from "@/plugins/socket";
import { router } from "./lib/router";

const app = createApp(App);
const pinia = createPinia();
app.use(SocketPlugin);
app.use(router);
app.use(pinia);
app.mount("#app");
