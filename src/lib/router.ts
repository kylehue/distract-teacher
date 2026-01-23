import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/app/pages/home.vue";
import LoginPage from "@/app/pages/login.vue";
import RegisterPage from "@/app/pages/register.vue";
import ProfilePage from "@/app/pages/profile.vue";
import DashboardRoomsPage from "@/app/pages/dashboard/rooms.vue";
import RoomOverviewPage from "@/app/pages/dashboard/room/overview/index.vue";
import RoomSettingsPage from "@/app/pages/dashboard/room/settings.vue";
import RoomStudentsPage from "@/app/pages/dashboard/room/students.vue";
import RoomMonitoringPage from "@/app/pages/dashboard/room/monitoring.vue";
import UnauthorizedPage from "@/app/pages/error/unauthorized.vue";
import ForbiddenPage from "@/app/pages/error/forbidden.vue";
import NotFoundPage from "@/app/pages/error/not-found.vue";
import RoomLayout from "@/app/pages/dashboard/room/layout.vue";
import StudentReportsPage from "@/app/pages/dashboard/student-reports/index.vue";
import MainLayout from "@/app/pages/layout.vue";

const routes: RouteRecordRaw[] = [
   {
      path: "/",
      redirect: "/home",
      component: MainLayout,
      children: [
         { path: "/home", component: HomePage },
         { path: "/login", component: LoginPage },
         { path: "/register", component: RegisterPage },
         { path: "/profile", component: ProfilePage },
         {
            path: "/dashboard",
            children: [
               {
                  path: "",
                  redirect: "/dashboard/rooms",
               },
               {
                  path: "student-reports/:studentId",
                  component: StudentReportsPage,
               },
               { path: "rooms", component: DashboardRoomsPage },
               {
                  path: "rooms/:roomId",
                  component: RoomLayout,
                  redirect: (to) => ({
                     path: `/dashboard/rooms/${to.params.roomId}/overview`,
                  }),
                  children: [
                     { path: "overview", component: RoomOverviewPage },
                     { path: "settings", component: RoomSettingsPage },
                     { path: "students", component: RoomStudentsPage },
                     { path: "monitoring", component: RoomMonitoringPage },
                  ],
               },
            ],
         },
         { path: "/unauthorized", component: UnauthorizedPage },
         { path: "/forbidden", component: ForbiddenPage },
         { path: "/not-found", component: NotFoundPage },
      ],
   },
   {
      path: "/:pathMatch(.*)*",
      redirect: "/not-found",
   },
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export { router };
