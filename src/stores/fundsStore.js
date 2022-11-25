import keys from "lodash/keys";
import min from "lodash/min";
import minBy from "lodash/minBy";
import values from "lodash/values";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

import { fundsQuery } from "@/blockchain/queries";
import { useFunds } from "@/composables";

export default defineStore(
  "funds",
  () => {
    const funds = useFunds();
    const query = fundsQuery();

    const selectedFundHash = ref("");

    watch(
      [selectedFundHash, query.isSuccess, funds.selectable],
      ([hash, isSuccess, selectable]) => {
        if (isSuccess) {
          if (!keys(selectable).includes(hash)) {
            selectedFundHash.value = "";
          }
          if (!selectedFundHash.value) {
            selectedFundHash.value = autoselect();
          }
        }
      },
      { immediate: true },
    );

    function autoselect() {
      const candidates = values(funds.selectable.value).map(({ currentStages, fundHash, fundGenesis }) => {
        return {
          fundHash,
          stageEndDate: min(currentStages.map((stage) => fundGenesis[`${stage}EndDate`])),
        };
      });
      const selected = minBy(candidates, "stageEndDate");
      return selected ? selected.fundHash : "";
    }

    return {
      selectedFundHash,
      autoselect,
    };
  },
  {
    persist: {
      paths: ["selectedFundHash"],
    },
  },
);
