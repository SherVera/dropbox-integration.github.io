const routes = [
  {
    path: "/",
    redirect: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "dropbox",
        path: "/dropbox",
        component: () => import("src/pages/DropBox.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    name: "login",
    path: "/login",
    component: () => import("src/layouts/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    name: "callback",
    path: "/callback",
    component: () => import("src/layouts/Callback.vue"),
    meta: { requiresAuth: false },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
