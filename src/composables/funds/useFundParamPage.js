import { computed } from "vue";
import { useRoute } from "vue-router";

import { useFund, useIsFundSelected } from "@/composables";

export default function useFundParamPage() {
  const route = useRoute();
  const fundHash = route.params.fundHash;

  const { isFundSelected } = useIsFundSelected();
  const { exists: fundExists, genesis } = useFund(fundHash);

  const fundIsNotSelected = computed(() => fundHash === "current" && !isFundSelected.value);

  return {
    fundHash,
    fundExists,
    genesis,
    fundIsNotSelected,
  };
}
