import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { computed } from "vue";

import { useConnectedWallet } from "@/composables";

import { getMetadataSelectionUrl } from "./utils";

function fetchPublishedProposals(stakeAddress) {
  return () =>
    axios
      .get(getMetadataSelectionUrl("proposalPublication", { "json->>creator": `eq.${stakeAddress.value}` }))
      .then(({ data }) => data);
}

export default function publishedProposalsQuery() {
  const { stakeAddress } = useConnectedWallet();
  const enabled = computed(() => !!stakeAddress.value);
  return useQuery(["publishedProposals"], fetchPublishedProposals(stakeAddress), {
    enabled,
    staleTime: Infinity,
  });
}
