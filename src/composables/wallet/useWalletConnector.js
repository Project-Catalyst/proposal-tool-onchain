import { storeToRefs } from "pinia";
import { computed } from "vue";

import { useWalletStore } from "@/stores";

export default function useWalletConnector() {
  const walletStore = useWalletStore();

  const { connect, disconnect } = walletStore;
  const { availableWalletsKeys, connectingWalletKey } = storeToRefs(walletStore);

  const isConnecting = computed(() => !!connectingWalletKey.value);

  return {
    availableKeys: availableWalletsKeys,
    isConnecting,
    connect,
    disconnect,
  };
}
