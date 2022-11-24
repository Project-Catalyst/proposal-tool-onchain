import { storeToRefs } from "pinia";

import { createMetadataTx, getSignedTxCbor, signTx } from "@/blockchain/wallet";
import { useNotifications } from "@/composables";
import { useTxConfirmationStore, useWalletStore } from "@/stores";

export default function useTxSubmit(mutation) {
  const notifications = useNotifications();

  const { confirm } = useTxConfirmationStore();

  const walletStore = useWalletStore();
  const { selectedWalletApi: walletApi } = storeToRefs(walletStore);

  const {
    action = "",
    queryToUpdate = null,
    mutation: { isLoading, isError, isSuccess, error, reset, mutateAsync },
  } = mutation();

  async function submit(payload) {
    walletStore.setIsBusy(true);

    try {
      const { tx, witnessSet } = await createMetadataTx(walletApi.value, action, payload);

      const signedTx = await signTx(walletApi.value, tx, witnessSet, true);
      const txCbor = getSignedTxCbor(signedTx);

      return await mutateAsync(txCbor, {
        onError,
        onSuccess,
        onSettled: reset,
      });
    } catch (error) {
      notifications.danger(`Transaction didn't submitted: ${error.message}`);
    } finally {
      walletStore.setIsBusy(false);
    }
  }

  function onError(error) {
    notifications.danger(`Transaction submission error: ${error.message}`);
  }

  function onSuccess(txHash) {
    notifications.success([
      `Transaction submission successfull, hash: ${txHash}.`,
      "Awaiting blockchain confirmation. You can safely leave this page.",
    ]);
    confirm(txHash, queryToUpdate);
  }

  return {
    isLoading,
    isError,
    isSuccess,
    error,

    submit,
  };
}
