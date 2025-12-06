import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/app/pages/home.vue";

const routes: RouteRecordRaw[] = [
   { path: "/", redirect: "/home" },
   { path: "/home", component: HomePage },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export { router };
