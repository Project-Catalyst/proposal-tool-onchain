<template>
  <article class="message is-warning">
    <div class="message-body">
      <p v-if="(isConnected && !isReady)">
        <span>
          <icon-loading />
        </span>
        <span>
          Processing wallet connection...
        </span>
      </p>

      <p v-else>
        <span>
          Please check your wallet connection to see this page
        </span>
      </p>
    </div>
  </article>
</template>

<script setup>
import { useConnectedWallet } from "@/composables";

const { isConnected, isReady } = useConnectedWallet();
</script>
