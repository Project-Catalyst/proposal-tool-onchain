import { useRoute } from "vue-router";

import { useChallenge, useFundParamPage } from "@/composables";

export default function useChallengeParamPage() {
  const route = useRoute();
  const challengeId = route.params.challengeId;

  const { fundHash, fundHashParam, fundExists, fundIsNotSelected } = useFundParamPage();

  const { exists: challengeExists, instance: challenge } = useChallenge(fundHash, challengeId);

  return {
    fundHash,
    fundHashParam,
    fundExists,
    fundIsNotSelected,

    challengeId,
    challengeExists,
    challenge,
  };
}
