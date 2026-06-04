import { createRouter, createWebHistory } from "vue-router";

import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import TaskList from "../pages/TaskList.vue";
import TaskDetail from "../pages/TaskDetail.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/dashboard", component: Dashboard },
  { path: "/tasks", component: TaskList },
  { path: "/tasks/:id", component: TaskDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;