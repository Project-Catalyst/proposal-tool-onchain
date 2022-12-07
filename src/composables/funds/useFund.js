import { reactify } from "@vueuse/core";
import { computed } from "vue";

import { useFunds } from "@/composables";

export default function useFund(hash) {
  const funds = useFunds();

  const fundHash = computed(() => (hash === "current" ? funds.selectedFundHash.value : hash));

  const exists = reactify(funds.exists)(fundHash);
  const instance = reactify(funds.getByHash)(fundHash);

  const genesis = computed(() => instance.value?.fundGenesis);
  const isCurrent = computed(() => fundHash.value === funds.selectedFundHash.value);

  return {
    hash: fundHash.value,
    exists,
    instance,
    genesis,
    isCurrent,
  };
}
