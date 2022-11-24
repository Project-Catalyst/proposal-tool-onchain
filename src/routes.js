import PageFundSelected from "@/pages/PageFundSelected.vue";
import PageHome from "@/pages/PageHome.vue";
import PageNotFound from "@/pages/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: PageHome,
  },

  {
    path: "/fund",
    name: "funds:selected",
    component: PageFundSelected,
  },

  {
    path: "/:catchAll(.*)",
    component: PageNotFound,
  },
];

export default routes;
