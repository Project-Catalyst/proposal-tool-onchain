import PageChallenge from "@/pages/PageChallenge.vue";
import PageChallenges from "@/pages/PageChallenges.vue";
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
    path: "/challenges",
    name: "challenges",
    component: PageChallenges,
  },
  {
    path: "/challenge/:id",
    name: "challenges:challengeDetails",
    component: PageChallenge,
  },

  {
    path: "/:catchAll(.*)",
    component: PageNotFound,
  },
];

export default routes;
