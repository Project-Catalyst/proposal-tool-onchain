<template>
  <wrapper-page
    title="On-Chain Proposals"
    subtitle="Published proposals for given fund(s)"
    :is-loading="isFundsLoading"
  >
    <div class="block">
      PUBLISHED PROPOSALS
    </div>
  </wrapper-page>
</template>

<script setup>
import { fundsQuery } from "@/blockchain/queries";

const { isLoading: isFundsLoading } = fundsQuery();
</script>
