import dayjs from "dayjs";
import { md5 } from "hash-wasm";
import cloneDeep from "lodash/cloneDeep";
import { defineStore } from "pinia";
import { ref } from "vue";

import { currentBlock } from "@/blockchain/queries";
import { useConnectedWallet } from "@/composables";

async function genId(proposalData) {
  const block = await currentBlock();
  const blockHash = block.hash.slice(2);
  const proposalTitle = proposalData["Proposal title"];
  const proposalAuthor = proposalData["Author"];
  return await md5(proposalTitle + proposalAuthor + blockHash);
}

export default defineStore(
  "proposals",
  () => {
    const connectedWallet = useConnectedWallet();

    const all = ref([]);

    async function create(proposalData) {
      if (!connectedWallet.stakeAddress.value) {
        throw new Error("Unable to get wallet stake address. Check the wallet connection and try again");
      }
      const nowFormatted = dayjs().format("YYYY-MM-DDTHH:mm:ss");
      proposalData.id = await genId(proposalData);
      proposalData.creator = connectedWallet.stakeAddress.value;
      proposalData.createdAt = nowFormatted;
      proposalData.updatedAt = nowFormatted;
      all.value.push(cloneDeep(proposalData));
    }

    function put(proposalData) {
      const nowFormatted = dayjs().format("YYYY-MM-DDTHH:mm:ss");
      const index = all.value.findIndex(({ id }) => id === proposalData.id);
      proposalData.updatedAt = nowFormatted;
      if (index >= 0) {
        all.value.splice(index, 1, proposalData);
      } else {
        all.value.push(proposalData);
      }
    }

    function remove(proposalId) {
      const index = all.value.findIndex(({ id }) => id === proposalId);
      if (index !== -1) {
        all.value.splice(index, 1);
      }
    }

    function clear() {
      all.value = [];
    }

    return {
      all,

      create,
      put,
      remove,
      clear,
    };
  },
  {
    persist: {
      paths: ["all"],
    },
  },
);
