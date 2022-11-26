import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore(
  "proposals",
  () => {
    const all = ref([]);

    function put(proposalData) {
      if (!proposalData.id) {
        proposalData.id = Date.now().toString();
        all.value.push(proposalData);
      } else {
        const index = all.value.findIndex(({ id }) => id === proposalData.id);
        all.value.splice(index, 1, proposalData);
      }
    }

    function remove(proposalId) {
      const index = all.value.findIndex(({ id }) => id === proposalId);
      if (index !== -1) {
        all.value.splice(index, 1);
      }
    }

    return {
      all,

      put,
      remove,
    };
  },
  {
    persist: {
      paths: ["all"],
    },
  },
);
