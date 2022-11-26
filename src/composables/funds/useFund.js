import { reactify } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useFunds } from "@/composables";
import { useFundsStore } from "@/stores";

export default function useFund(hash) {
  const funds = useFunds();
  const { selectedFundHash } = storeToRefs(useFundsStore());

  const fundHash = computed(() => (hash === "current" ? selectedFundHash.value : hash));

  const exists = reactify(funds.exists)(fundHash);
  const instance = reactify(funds.getByHash)(fundHash);

  const genesis = computed(() => instance.value?.fundGenesis);
  const isCurrent = computed(() => fundHash.value === selectedFundHash.value);

  return {
    hash,
    exists,
    instance,
    genesis,
    isCurrent,
  };
}
