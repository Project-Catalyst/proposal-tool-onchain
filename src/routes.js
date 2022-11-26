import PageChallenge from "@/pages/PageChallenge.vue";
import PageChallenges from "@/pages/PageChallenges.vue";
import PageFund from "@/pages/PageFund.vue";
import PageHome from "@/pages/PageHome.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import PageProposalCreate from "@/pages/PageProposalCreate.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: PageHome,
  },

  {
    path: "/funds/:fundHash",
    name: "funds:fundDetails",
    component: PageFund,
  },

  {
    path: "/funds/:fundHash/challenges",
    name: "challenges",
    component: PageChallenges,
  },
  {
    path: "/funds/:fundHash/challenge/:challengeId",
    name: "challenges:challengeDetails",
    component: PageChallenge,
  },
  {
    path: "/funds/:fundHash/challenge/:challengeId/new-proposal",
    name: "challenges:proposal:create",
    component: PageProposalCreate,
  },

  {
    path: "/:catchAll(.*)",
    component: PageNotFound,
  },
];

export default routes;
