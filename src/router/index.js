import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Chatroom from "../views/Chatroom.vue";
import { projectAuth } from "../firebase/config";

// [route guard] yang berupa fungsi
// terdapat 3 parameter yang otomatis yang disediakan oleh vue:
/*
  to: tujuan, from: asal, next: fungsi redirect
*/
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  // console.log("Current user is auth guard: ", user);
  if (!user) {
    next({ name: "Welcome" });
  } else {
    next();
  }
};

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (user) {
    next({ name: "Chatroom" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
    beforeEnter: requireNoAuth,
  },
  {
    path: "/chatroom",
    name: "Chatroom",
    component: Chatroom,

    // buat routeGuard beforeEnter
    beforeEnter: requireAuth,
  },

  // masih terdapat bug saat kita mencoba melakukan login
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
