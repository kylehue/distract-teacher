import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/app/pages/home.vue";
import LoginPage from "@/app/pages/login.vue";
import RegisterPage from "@/app/pages/register.vue";
import DashboardLayout from "@/app/pages/dashboard.vue";
import OverviewPage from "@/app/pages/dashboard/overview.vue";
import RoomsPage from "@/app/pages/dashboard/rooms.vue";
import RoomDetailPage from "@/app/pages/dashboard/room-detail.vue";
import CreateRoomPage from "@/app/pages/dashboard/create-room.vue";
import ReportsPage from "@/app/pages/dashboard/reports.vue";
import EvidencePage from "@/app/pages/dashboard/evidence.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  { path: "/home", component: HomePage },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      { path: "overview", component: OverviewPage },
      { path: "rooms", component: RoomsPage },
      { path: "rooms/create", component: CreateRoomPage },
      { path: "rooms/:id", component: RoomDetailPage },
      { path: "reports", component: ReportsPage },
      { path: "evidence", component: EvidencePage },
      { path: "", redirect: "overview" },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
