import intersection from "lodash/intersection";
import map from "lodash/map";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { OPERABLE_STAGES } from "@/blockchain/const";
import { fundsQuery } from "@/blockchain/queries";
import { transformFundsList } from "@/blockchain/queries/utils";
import { useTick } from "@/composables";
import { useFundsStore } from "@/stores";

function toHashMap(hashMap, fund) {
  hashMap[fund.fundHash] = fund;
  return hashMap;
}

export default function useFunds() {
  const { selectedFundHash } = storeToRefs(useFundsStore());

  const query = fundsQuery();

  const { tick } = useTick(60 * 1000);

  const all = computed(
    () => query.data.value?.map((metadata) => transformFundsList(metadata, tick.value)) || [],
  );

  const hashes = computed(() => map(all.value, "fundHash"));

  const mapHashTitle = computed(() =>
    all.value.reduce((acc, fund) => {
      acc[fund.fundHash] = fund.fundGenesis.title;
      return acc;
    }, {}),
  );

  const mapChallengeTitles = computed(() =>
    all.value.reduce((acc, fund) => {
      acc[fund.fundHash] = {};
      for (const challenge of fund.fundGenesis.challenges) {
        acc[fund.fundHash][challenge.id] = challenge.title;
      }
      return acc;
    }, {}),
  );

  const selectable = computed(() =>
    all.value
      .filter(({ currentStages }) => intersection(currentStages, OPERABLE_STAGES).length)
      .reduce(toHashMap, {}),
  );

  function exists(hash) {
    return hashes.value.includes(hash);
  }

  function getByHash(hash) {
    return all.value.find(({ fundHash }) => fundHash === hash) || null;
  }

  return {
    all,
    hashes,
    selectable,
    mapHashTitle,
    mapChallengeTitles,
    selectedFundHash,

    exists,
    getByHash,
  };
}
