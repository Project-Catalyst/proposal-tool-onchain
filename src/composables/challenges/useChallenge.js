import { reactify } from "@vueuse/core";

import { useChallenges } from "@/composables";

export default function useChallenge(fundHash, challengeId) {
  const challenges = useChallenges(fundHash);

  const exists = reactify(challenges.exists)(challengeId);
  const instance = reactify(challenges.getById)(challengeId);

  return {
    exists,
    instance,
  };
}
