import { createRouter, createWebHistory } from "vue-router";

import Login from "../pages/Login.vue";
import DashBoard from "../pages/DashBoard.vue";
import TaskList from "../pages/TaskList.vue";
import TaskDetail from "../pages/TaskDetail.vue";
import TaskManagement from "../pages/TaskManagement.vue";
import Reports from "../pages/Reports.vue";
import Settings from "../pages/Settings.vue";
import Attendance from "../pages/Attendance.vue";
import Chat from "../pages/Chat.vue";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/dashboard",
    component: DashBoard,
  },
  {
    path: "/tasks",
    component: TaskList,
  },
  {
    path: "/taskmanagement",
    component: TaskManagement,
  },
  {
    path: "/reports",
    component: Reports,
  },
  {
    path: "/settings",
    component: Settings,
  },
  {
    path: "/tasks/:id",
    component: TaskDetail,
  },
  {
  path: "/attendance",
  component: Attendance,
},
{
  path: "/chat",
  component: Chat,
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;