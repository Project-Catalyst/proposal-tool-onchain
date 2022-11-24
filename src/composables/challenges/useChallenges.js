import { reactify } from "@vueuse/core";
import map from "lodash/map";
import { computed } from "vue";

import { useSelectedFund } from "@/composables";

export default function useChallenges() {
  const selectedFund = useSelectedFund();

  const all = computed(() => selectedFund.fund.value?.fundGenesis.challenges || []);
  const ids = computed(() => map(all.value, "id"));

  function getById(id) {
    return all.value.find((challenge) => challenge.id === id);
  }

  return {
    all,
    ids,

    getById: reactify(getById),
  };
}
