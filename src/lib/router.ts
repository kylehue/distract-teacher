import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { defineAsyncComponent } from "vue";
import MainLayout from "@/app/pages/layout.vue";
import ContentLoader from "@/app/components/content-loader.vue";

// public pages
import HomePage from "@/app/pages/home.vue";
import LoginPage from "@/app/pages/login.vue";
import RegisterPage from "@/app/pages/register.vue";
import UnauthorizedPage from "@/app/pages/error/unauthorized.vue";
import ForbiddenPage from "@/app/pages/error/forbidden.vue";
import NotFoundPage from "@/app/pages/error/not-found.vue";

function _defineAsyncComponent(loader: () => Promise<any>) {
   return defineAsyncComponent({
      loader,
      loadingComponent: ContentLoader,
      suspensible: false,
      delay: 0,
      timeout: 15000,
   });
}

const routes: RouteRecordRaw[] = [
   {
      path: "/",
      component: MainLayout,
      children: [
         { path: "", component: HomePage },
         { path: "login", component: LoginPage },
         { path: "register", component: RegisterPage },
         {
            path: "profile",
            component: _defineAsyncComponent(
               () => import("@/app/pages/profile.vue"),
            ),
         },
         {
            path: "dashboard",
            children: [
               { path: "", redirect: "/dashboard/rooms" },
               {
                  path: "student-reports/:studentId",
                  component: _defineAsyncComponent(
                     () =>
                        import("@/app/pages/dashboard/student-reports/index.vue"),
                  ),
               },
               {
                  path: "rooms",
                  component: _defineAsyncComponent(
                     () => import("@/app/pages/dashboard/rooms.vue"),
                  ),
               },
               {
                  path: "rooms/:roomId",
                  component: _defineAsyncComponent(
                     () => import("@/app/pages/dashboard/room/layout.vue"),
                  ),
                  redirect: (to) => ({
                     path: `/dashboard/rooms/${to.params.roomId}/overview`,
                  }),
                  children: [
                     {
                        path: "overview",
                        component: _defineAsyncComponent(
                           () =>
                              import("@/app/pages/dashboard/room/overview/index.vue"),
                        ),
                     },
                     {
                        path: "settings",
                        component: _defineAsyncComponent(
                           () =>
                              import("@/app/pages/dashboard/room/settings.vue"),
                        ),
                     },
                     {
                        path: "students",
                        component: _defineAsyncComponent(
                           () =>
                              import("@/app/pages/dashboard/room/students.vue"),
                        ),
                     },
                     {
                        path: "monitoring",
                        component: _defineAsyncComponent(
                           () =>
                              import("@/app/pages/dashboard/room/monitoring.vue"),
                        ),
                     },
                  ],
               },
            ],
         },

         { path: "unauthorized", component: UnauthorizedPage },
         { path: "forbidden", component: ForbiddenPage },
         { path: "not-found", component: NotFoundPage },
      ],
   },
   { path: "/:pathMatch(.*)*", redirect: "/not-found" },
];

const router = createRouter({
   history: createWebHistory(import.meta.env.VITE_BASE_URL),
   routes,
});

export { router };
