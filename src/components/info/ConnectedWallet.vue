<template>
  <h4 class="is-size-5">
    {{ walletProps.name }}
  </h4>
  <figure>
    <img
      :src="walletProps.icon"
      alt="Wallet icon"
      width="100"
    >
  </figure>
  <p>
    <b>API version</b>: {{ walletProps.apiVersion }}
  </p>
  <p>
    <b>Network ID</b>: {{ networkId }}
  </p>
  <p>
    <b>Stake address</b>: <code>{{ stakeAddress }}</code>
  </p>
</template>

<script setup>
import { useConnectedWallet } from "@/composables";

const { networkId, stakeAddress, props: walletProps } = useConnectedWallet();
</script>
