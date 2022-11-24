import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useFundsStore } from "@/stores";

export default function useSelectedFund() {
  const fundsStore = useFundsStore();

  const { selectedFundHash: hash } = storeToRefs(fundsStore);

  const fund = computed(() => fundsStore.funds.getByHash(hash.value) || null);
  const isNotSelected = computed(() => !fund.value);

  return {
    hash,
    fund,
    isNotSelected,
  };
}
