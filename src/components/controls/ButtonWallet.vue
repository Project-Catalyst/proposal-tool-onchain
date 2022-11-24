<template>
  <o-button
    v-if="isConnecting"
    variant="warning"
    :size="props.size"
    :disabled="isConnecting"
    @click="connect(availableKeys[0])"
  >
    <icon-loading />
    <span>{{ buttonLabel }}</span>
  </o-button>

  <template
    v-else-if="!isConnected"
  >
    <o-button
      v-if="availableKeys.length === 0"
      variant="warning"
      :size="props.size"
    >
      No Cardano wallets detected
    </o-button>

    <o-button
      v-else-if="availableKeys.length === 1"
      variant="warning"
      :size="props.size"
      @click="connect(availableKeys[0])"
    >
      <span>{{ buttonLabel }}</span>
    </o-button>

    <o-dropdown
      v-else-if="availableKeys.length > 1"
      position="bottom-left"
      aria-role="list"
    >
      <template #trigger="{ active }">
        <dropdown-button
          variant="warning"
          :is-active="active"
          :size="props.size"
        >
          {{ buttonLabel }}
        </dropdown-button>
      </template>

      <o-dropdown-item
        v-for="walletKey in availableKeys"
        :key="walletKey"
        aria-role="listitem"
        @click="connect(walletKey)"
      >
        {{ walletKey }}
      </o-dropdown-item>
    </o-dropdown>
  </template>

  <o-dropdown
    v-else
    position="bottom-left"
    aria-role="list"
  >
    <template #trigger="{ active }">
      <dropdown-button
        variant="success"
        :is-active="active"
        :is-loading="isBusy"
        :size="props.size"
      >
        {{ buttonLabel }}
      </dropdown-button>
    </template>

    <o-dropdown-item
      aria-role="listitem"
      :disabled="!isReady"
      @click="showInfo"
    >
      <icon-loading v-if="!isReady" />

      <span>
        Wallet info
      </span>
    </o-dropdown-item>

    <o-dropdown-item
      aria-role="listitem"
      :disabled="isBusy"
      @click="disconnect"
    >
      Disconnect
    </o-dropdown-item>
  </o-dropdown>
</template>

<script setup>
import { computed } from "vue";

import DropdownButton from "@/components/common/ButtonDropdown.vue";
import { sizePropValidator } from "@/components/common/propValidators";
import { useConnectedWallet, useWalletConnector } from "@/composables";

const props = defineProps({
  size: {
    type: String,
    default: undefined,
    validator: sizePropValidator,
  },
});

const { availableKeys, isConnecting, connect, disconnect } = useWalletConnector();
const { isBusy, isConnected, isReady, key, showInfo } = useConnectedWallet();

const buttonLabel = computed(() => {
  return (
    isConnecting.value
      ? "Connecting wallet..."
      : isConnected.value
        ? `Wallet connected (${key.value})`
        : "Connect Cardano wallet");
});
</script>
