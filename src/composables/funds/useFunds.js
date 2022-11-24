import intersection from "lodash/intersection";
import map from "lodash/map";
import { computed } from "vue";

import { OPERABLE_STAGES } from "@/blockchain/const";
import { fundsQuery } from "@/blockchain/queries";
import { transformFundsList } from "@/blockchain/queries/utils";
import { useTick } from "@/composables";

function toHashMap(hashMap, fund) {
  hashMap[fund.fundHash] = fund;
  return hashMap;
}

export default function useFunds() {
  const query = fundsQuery();

  const { tick } = useTick(60 * 1000);

  const all = computed(
    () => query.data.value?.map((metadata) => transformFundsList(metadata, tick.value)) || [],
  );

  const hashes = computed(() => map(all.value, "fundHash"));

  const selectable = computed(() =>
    all.value
      .filter(({ currentStages }) => intersection(currentStages, OPERABLE_STAGES).length)
      .reduce(toHashMap, {}),
  );

  function getByHash(hash) {
    return all.value.find(({ fundHash }) => fundHash === hash);
  }

  return {
    query,

    all,
    hashes,
    selectable,

    getByHash,
  };
}
