import { md5 } from "hash-wasm";
import { defineStore } from "pinia";
import { ref } from "vue";

import { currentBlock } from "@/blockchain/queries";

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
    const all = ref([]);

    async function create(proposalData) {
      proposalData.id = await genId(proposalData);
      all.value.push(proposalData);
    }

    function put(proposalData) {
      const index = all.value.findIndex(({ id }) => id === proposalData.id);
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
