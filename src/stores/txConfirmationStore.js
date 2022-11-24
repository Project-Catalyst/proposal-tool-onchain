import { useQueryClient } from "@tanstack/vue-query";
import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore(
  "txConfirmation",
  () => {
    const queryClient = useQueryClient();

    const confirmingTxHash = ref(null);
    const confirmingTxQueryToUpdate = ref(null);

    function confirm(txHash, queryToUpdate = null) {
      if (!confirmingTxHash.value) {
        confirmingTxHash.value = txHash;
        confirmingTxQueryToUpdate.value = queryToUpdate;
      }
    }

    function rollbackQuery(txHash) {
      if (confirmingTxQueryToUpdate.value) {
        queryClient.setQueryData(confirmingTxQueryToUpdate.value, (data) => {
          if (data) {
            return data.filter(({ tx }) => tx.hash.slice(2) !== txHash);
          }
        });
      }
    }

    function updateQuery(confirmedMetadata) {
      if (confirmingTxQueryToUpdate.value) {
        queryClient.setQueryData(confirmingTxQueryToUpdate.value, (data) => {
          if (data) {
            return [...data, confirmedMetadata];
          }
        });
      }
    }

    function reset() {
      confirmingTxHash.value = null;
      confirmingTxQueryToUpdate.value = null;
    }

    return {
      confirmingTxHash,
      confirmingTxQueryToUpdate,
      confirm,
      updateQuery,
      rollbackQuery,
      reset,
    };
  },
  {
    persist: {
      paths: ["confirmingTxHash", "confirmingTxQueryToUpdate"],
    },
  },
);
