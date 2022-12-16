import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { computed } from "vue";

import { getMetadataSelectionUrl } from "./utils";

export default function proposalsOnChainQuery(fundHashes) {
  const enabled = computed(() => !!fundHashes.value.length);
  return useQuery(
    ["proposalsOnChain", fundHashes],
    () =>
      axios
        .get(
          getMetadataSelectionUrl("proposalPublication", {
            "json->payload->>fundHash": `in.(${fundHashes.value.join(",")})`,
          }),
        )
        .then(({ data }) => data),
    {
      enabled,
      staleTime: 20 * 60 * 1000,
    },
  );
}
