import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore(
  "proposals",
  () => {
    const all = ref([]);

    function put(proposal) {
      if (!proposal.id) {
        proposal.id = Date.now().toString();
        all.value.push(proposal);
      } else {
        const index = all.value.findIndex(({ id }) => id === proposal.id);
        all.value.splice(index, 1, proposal);
      }
    }

    return {
      all,
      put,
    };
  },
  {
    persist: {
      paths: ["all"],
    },
  },
);
