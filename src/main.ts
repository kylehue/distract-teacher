import { createApp } from "vue";
import "./styles/main.css";
import App from "./app/index.vue";
import { router } from "./lib/router";

const app = createApp(App);
app.use(router);
app.mount("#app");
