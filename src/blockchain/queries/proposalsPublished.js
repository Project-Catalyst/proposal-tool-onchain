import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { computed } from "vue";

import { useConnectedWallet } from "@/composables";

import { getMetadataSelectionUrl } from "./utils";

function fetchProposalsPublished(stakeAddress) {
  return () =>
    axios
      .get(getMetadataSelectionUrl("proposalPublication", { "json->>creator": `eq.${stakeAddress.value}` }))
      .then(({ data }) => data);
}

export default function proposalsPublishedQuery() {
  const { stakeAddress } = useConnectedWallet();
  const enabled = computed(() => !!stakeAddress.value);
  return useQuery(["proposalsPublished"], fetchProposalsPublished(stakeAddress), {
    enabled,
    staleTime: Infinity,
  });
}
