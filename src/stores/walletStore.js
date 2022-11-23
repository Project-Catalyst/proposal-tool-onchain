import { defineStore } from "pinia";
import { computed, ref, shallowRef, watch } from "vue";

import {
  getAvailableWalletsKeys,
  getCompatibleWalletsKeys,
  getWalletApi,
  getWalletObject,
  getWalletStakeAddressBech32,
} from "@/blockchain/wallet";
import { useNotifications } from "@/composables";

export default defineStore(
  "wallet",
  () => {
    const notifications = useNotifications();

    /* wallets availability */

    const compatibleWalletsKeys = getCompatibleWalletsKeys();
    const availableWalletsKeys = ref([]);

    try {
      availableWalletsKeys.value.push(...getAvailableWalletsKeys());
    } catch (err) {
      handleWalletsAvailabilityError(err);
    }

    function handleWalletsAvailabilityError(err) {
      let errorMessage = err.message;
      if (errorMessage.includes("No available wallets")) {
        errorMessage += `<br>Please install one of compatible wallets: ${compatibleWalletsKeys.join(", ")}`;
      }
      notifications.warning(errorMessage, { indefinite: true });
    }

    /* connect/disconnect wallet */

    const connectingWalletKey = ref("");
    const selectedWalletKey = ref("");

    const selectedWalletObject = shallowRef(null);
    const selectedWalletApi = shallowRef(null);

    const selectedWalletProps = computed(() => {
      if (!selectedWalletObject.value) {
        return null;
      } else {
        return {
          name: selectedWalletObject.value.name,
          icon: selectedWalletObject.value.icon,
          apiVersion: selectedWalletObject.value.apiVersion,
        };
      }
    });

    function connect(walletKey) {
      if (compatibleWalletsKeys.includes(walletKey)) {
        connectingWalletKey.value = walletKey;
      } else {
        notifications.danger(`Wallet "${walletKey}" is not compatible`);
      }
    }

    function reconnect(hard = false) {
      if (selectedWalletKey.value) {
        const walletKey = selectedWalletKey.value;
        if (hard) {
          disconnect();
        }
        if (!selectedWalletApi.value) {
          connect(walletKey);
        }
      }
    }

    function disconnect() {
      connectingWalletKey.value = "";
      selectedWalletKey.value = "";
      selectedWalletObject.value = null;
      selectedWalletApi.value = null;
    }

    async function onWalletConnect(walletKey) {
      if (walletKey) {
        try {
          selectedWalletObject.value = getWalletObject(walletKey);
          selectedWalletApi.value = await getWalletApi(walletKey);
          selectedWalletKey.value = walletKey;
        } catch (err) {
          disconnect();
          notifications.danger(`Wallet connection failed: ${err.message}`);
        } finally {
          connectingWalletKey.value = "";
        }
      }
    }

    watch(connectingWalletKey, onWalletConnect);

    /* wallet network/identity params */

    const selectedWalletNetworkId = ref(null);
    const selectedWalletStakeAddress = ref(null);

    async function onApiChange(api) {
      if (api) {
        const networkId = await api.getNetworkId();
        selectedWalletNetworkId.value = networkId;
        selectedWalletStakeAddress.value = await getWalletStakeAddressBech32(api, networkId);
      } else {
        selectedWalletNetworkId.value = null;
        selectedWalletStakeAddress.value = null;
      }
    }

    watch(selectedWalletApi, onApiChange);

    /* operating wallet lock */

    const isSelectedWalletBusy = ref(false);

    function setIsBusy(isBusy) {
      if (selectedWalletApi.value) {
        isSelectedWalletBusy.value = isBusy;
      }
    }

    return {
      availableWalletsKeys,

      connectingWalletKey,
      selectedWalletKey,

      selectedWalletObject,
      selectedWalletApi,
      selectedWalletProps,
      connect,
      reconnect,
      disconnect,

      selectedWalletNetworkId,
      selectedWalletStakeAddress,
      isSelectedWalletBusy,
      setIsBusy,
    };
  },
  {
    persist: {
      paths: ["selectedWalletKey"],

      afterRestore({ store }) {
        store.reconnect();
      },
    },
  },
);
