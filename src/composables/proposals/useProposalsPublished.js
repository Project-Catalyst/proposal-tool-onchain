import map from "lodash/map";
import { computed } from "vue";

import { publishedProposalsQuery } from "@/blockchain/queries";
import { transformMetadata } from "@/blockchain/queries/utils";

export default function useProposalsPublished() {
  const query = publishedProposalsQuery();

  const all = computed(() => query.data.value?.map(transformMetadata) || []);
  const count = computed(() => all.value.count);

  const ids = computed(() => map(all.value, "proposalId"));

  function exists(id) {
    return ids.value.includes(id);
  }

  function getById(id) {
    return all.value.find(({ proposalId }) => proposalId === id) || null;
  }

  return {
    all,
    count,
    ids,

    exists,
    getById,
  };
}
