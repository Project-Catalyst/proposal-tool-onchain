import { storeToRefs } from "pinia";
import { computed } from "vue";

import ConnectedWallet from "@/components/info/ConnectedWallet.vue";
import { useModal } from "@/composables";
import { useTxConfirmationStore, useWalletStore } from "@/stores";

export default function useConnectedWallet() {
  const modal = useModal();

  const walletStore = useWalletStore();
  const txConfirmationStore = useTxConfirmationStore();

  const {
    selectedWalletKey: key,
    selectedWalletNetworkId: networkId,
    selectedWalletStakeAddress: stakeAddress,
    isSelectedWalletBusy,
  } = storeToRefs(walletStore);

  const { confirmingTxHash } = storeToRefs(txConfirmationStore);

  const { selectedWalletProps: props, selectedWalletApi: api } = storeToRefs(walletStore);

  const isConnected = computed(() => !!api.value);
  const isReady = computed(() => isConnected.value && networkId.value >= 0 && !!stakeAddress.value);
  const isBusy = computed(() => isSelectedWalletBusy.value || !!confirmingTxHash.value);

  function showInfo() {
    modal.openComponent(ConnectedWallet, {
      title: "Connected wallet info",
      wrapperProps: { isContentCentered: true },
    });
  }

  return {
    key,
    networkId,
    stakeAddress,
    props,

    isConnected,
    isReady,
    isBusy,

    showInfo,
  };
}
