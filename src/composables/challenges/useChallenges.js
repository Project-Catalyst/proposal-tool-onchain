import map from "lodash/map";
import { computed } from "vue";

import { useFund } from "@/composables";

export default function useChallenges(fundHash) {
  const { genesis, exists: fundExists } = useFund(fundHash);

  const all = computed(() => genesis.value?.challenges || []);
  const ids = computed(() => map(all.value, "id"));

  function exists(id) {
    return ids.value.includes(+id);
  }

  function getById(id) {
    return all.value.find((challenge) => challenge.id === +id);
  }

  return {
    fundExists,
    all,
    ids,

    exists,
    getById,
  };
}
