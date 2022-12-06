<template>
  <article class="message is-warning">
    <div class="message-body">
      <p>
        <span v-if="(isConnected && !isReady)">
          <icon-loading />
        </span>
        Please check your wallet connection to see this page
      </p>
    </div>
  </article>
</template>

<script setup>
import { useConnectedWallet } from "@/composables";

const { isConnected, isReady } = useConnectedWallet();
</script>
