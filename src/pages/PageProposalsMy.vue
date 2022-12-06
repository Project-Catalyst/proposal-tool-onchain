<template>
  <wrapper-page
    title="My Proposals"
    :is-loading="isLoading"
    :is-empty="isEmpty"
    check-first="empty"
  >
    <div class="block">
      <table-my-proposals />
    </div>

    <div class="block buttons">
      <button-proposals-import />
      <button-proposals-export v-if="count > 0" />
    </div>

    <template #empty>
      <wallet-is-not-ready />
    </template>
  </wrapper-page>
</template>

<script setup>
import { computed } from "vue";

import { fundsQuery, proposalsPublishedQuery, proposalsWithdrawnQuery } from "@/blockchain/queries";
import ButtonProposalsExport from "@/components/controls/ButtonProposalsExport.vue";
import ButtonProposalsImport from "@/components/controls/ButtonProposalsImport.vue";
import TableMyProposals from "@/components/tables/TableMyProposals.vue";
import WalletIsNotReady from "@/components/warnings/WalletIsNotReady.vue";
import { useConnectedWallet, useProposals } from "@/composables";

const { isReady } = useConnectedWallet();
const { isLoading: isFundsLoading } = fundsQuery();
const { isLoading: isProposalsPublishedLoading } = proposalsPublishedQuery();
const { isLoading: isProposalsWithdrawnLoading } = proposalsWithdrawnQuery();

const { count } = useProposals();

const isLoading = computed(
  () => isFundsLoading.value || isProposalsPublishedLoading.value || isProposalsWithdrawnLoading.value,
);

const isEmpty = computed(() => !isReady.value);
</script>
