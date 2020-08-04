import Vue from "vue";
import VueRouter from "vue-router";

import state from "./state";

import Home from "./components/Home.vue";
import FAQ from "./components/FAQ.vue";
import Login from "./components/Login.vue";
import TicketsLayout from "./components/TicketsLayout.vue";
import Tickets from "./components/Tickets.vue";
import NewTicket from "./components/NewTicket.vue";

Vue.use(VueRouter);

const routes = [
  // Routes will be here
  { path: "/", name: "home", component: Home },
  { path: "/faq", name: "faq", component: FAQ },
  { path: "/login", name: "login", component: Login, meta: { guest: true } },
  {
    path: "/tickets",
    component: TicketsLayout,
    meta: { private: true },
    children: [
      { path: "", name: "tickets", component: Tickets },
      { path: "new", name: "new-ticket", component: NewTicket }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.private) && !state.user) {
    next({
      name: "login",
      params: {
        wantedRoute: to.fullPath
      }
    });
    return;
  }
  if (to.matched.some(r => r.meta.guest) && state.user) {
    next({ name: "home" });
    return;
  }
  console.log("to", to.name);
  next();
});

export default router;
