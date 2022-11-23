import PageHome from "@/pages/PageHome.vue";
import PageNotFound from "@/pages/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: PageHome,
  },

  {
    path: "/:catchAll(.*)",
    component: PageNotFound,
  },
];

export default routes;
