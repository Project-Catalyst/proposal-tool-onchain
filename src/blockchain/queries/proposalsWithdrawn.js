import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { computed } from "vue";

import { useConnectedWallet } from "@/composables";

import { getMetadataSelectionUrl } from "./utils";

function fetchProposalsWithdrawn(stakeAddress) {
  return () =>
    axios
      .get(getMetadataSelectionUrl("proposalWithdrawal", { "json->>creator": `eq.${stakeAddress.value}` }))
      .then(({ data }) => data);
}

export default function proposalsWithdrawnQuery() {
  const { stakeAddress } = useConnectedWallet();
  const enabled = computed(() => !!stakeAddress.value);
  return useQuery(["proposalsWithdrawn"], fetchProposalsWithdrawn(stakeAddress), {
    enabled,
    staleTime: Infinity,
  });
}
