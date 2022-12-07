import { computed } from "vue";
import { useRoute } from "vue-router";

import { useFund, useIsFundSelected } from "@/composables";

export default function useFundParamPage() {
  const route = useRoute();
  const fundHashParam = route.params.fundHash || "current";

  const { isFundSelected } = useIsFundSelected();
  const { exists: fundExists, hash: fundHash, genesis } = useFund(fundHashParam);

  const fundIsNotSelected = computed(() => fundHashParam === "current" && !isFundSelected.value);

  return {
    fundHash,
    fundHashParam,
    fundExists,
    fundIsNotSelected,
    genesis,
  };
}
