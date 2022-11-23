import { storeToRefs } from "pinia";
import { computed } from "vue";

import ConnectedWallet from "@/components/info/ConnectedWallet.vue";
import { useModal } from "@/composables";
import { useWalletStore } from "@/stores";

export default function useConnectedWallet() {
  const modal = useModal();
  const walletStore = useWalletStore();

  const {
    selectedWalletKey: key,
    selectedWalletNetworkId: networkId,
    selectedWalletStakeAddress: stakeAddress,
  } = storeToRefs(walletStore);

  const { selectedWalletProps: props, selectedWalletApi: api } = storeToRefs(walletStore);

  const isConnected = computed(() => !!api.value);
  const isReady = computed(() => isConnected.value && networkId.value >= 0 && !!stakeAddress.value);

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
    showInfo,
  };
}
