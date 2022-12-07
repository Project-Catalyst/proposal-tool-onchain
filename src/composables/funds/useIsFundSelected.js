import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useFundsStore } from "@/stores";

export default function useIsFundSelected() {
  const { selectedFundHash: hash } = storeToRefs(useFundsStore());

  const isFundSelected = computed(() => !!hash.value && hash.value !== "unselected");

  return {
    isFundSelected,
  };
}
