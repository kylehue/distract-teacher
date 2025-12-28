import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/app/pages/home.vue";
import LoginPage from "@/app/pages/login.vue";
import RegisterPage from "@/app/pages/register.vue";
import DashboardOverviewPage from "@/app/pages/dashboard/overview.vue";
import DashboardRoomsPage from "@/app/pages/dashboard/rooms.vue";
import DashboardReportsPage from "@/app/pages/dashboard/reports.vue";
import DashboardRecordPage from "@/app/pages/dashboard/record.vue";
import RoomOverviewPage from "@/app/pages/dashboard/room/overview.vue";
import RoomSettingsPage from "@/app/pages/dashboard/room/settings.vue";
import RoomStudentsPage from "@/app/pages/dashboard/room/students.vue";
import RoomMonitoringPage from "@/app/pages/dashboard/room/monitoring.vue";
import UnauthorizedPage from "@/app/pages/unauthorized.vue";
import RoomLayout from "@/app/pages/dashboard/room/layout.vue";

const routes: RouteRecordRaw[] = [
   { path: "/", redirect: "/login" },
   { path: "/login", component: LoginPage },
   { path: "/register", component: RegisterPage },
   { path: "/home", component: HomePage },
   {
      path: "/dashboard",
      children: [
         { path: "", redirect: "/dashboard/overview" },
         { path: "overview", component: DashboardOverviewPage },
         { path: "rooms", component: DashboardRoomsPage },
         { path: "reports", component: DashboardReportsPage },
         { path: "records/:recordId", component: DashboardRecordPage },

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
];

const router = createRouter({
   history: createWebHistory(),
   routes,
});

export { router };
