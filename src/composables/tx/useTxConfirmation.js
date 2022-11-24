import { createSharedComposable } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import { metadataByTxIdQuery, txByHashQuery } from "@/blockchain/queries";
import { useNotifications } from "@/composables";
import { useTxConfirmationStore } from "@/stores";

function useTxConfirmation() {
  const notifications = useNotifications();
  const txConfirmationStore = useTxConfirmationStore();

  const { confirmingTxHash: txHash } = storeToRefs(txConfirmationStore);

  const isTxQueryEnabled = computed(() => !!txHash.value);
  const txQuery = txByHashQuery(txHash, {
    enabled: isTxQueryEnabled,
    retry: 36,
    retryDelay: 5000,
    onError,
  });

  const txId = computed(() => txQuery.data.value?.id);
  const isMetadataQueryEnabled = computed(() => isTxQueryEnabled.value && !!txId.value);

  const metadataQuery = metadataByTxIdQuery(txId, {
    enabled: isMetadataQueryEnabled,
    retry: 5,
    retryDelay: 2500,
    onSuccess,
    onError,
  });

  function onError(error) {
    notifications.danger([`Transaction ${txHash.value} not confirmed`, error.message]);
    txConfirmationStore.rollbackQuery(txHash.value);
    txConfirmationStore.reset();
  }

  function onSuccess(data) {
    notifications.success(`Transaction ${txHash.value} submission confirmed`);
    txConfirmationStore.updateQuery(data);
    txConfirmationStore.reset();
  }

  const isLoading = computed(() => txQuery.isFetching.value || metadataQuery.isFetching.value);
  const isError = computed(() => txQuery.isError.value || metadataQuery.isError.value);
  const isConfirmed = computed(() => txQuery.isSuccess.value && metadataQuery.isSuccess.value);
  const isCompleted = computed(() => isError.value || isConfirmed.value);

  return {
    txHash,

    txQuery,
    metadataQuery,

    isLoading,
    isError,
    isConfirmed,
    isCompleted,
  };
}

export default createSharedComposable(useTxConfirmation);
