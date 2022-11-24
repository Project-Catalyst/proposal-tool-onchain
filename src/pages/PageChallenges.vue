<template>
  <wrapper-page
    title="Challenges"
    :subtitle="fund?.title"
    :is-loading="isLoading"
    :is-empty="isEmpty"
  >
    <table-challenges />

    <template #empty>
      <no-selected-fund />
    </template>
  </wrapper-page>
</template>

<script setup>
import { fundsQuery } from "@/blockchain/queries";
import TableChallenges from "@/components/tables/TableChallenges.vue";
import NoSelectedFund from "@/components/warnings/NoSelectedFund.vue";
import { useSelectedFund } from "@/composables";

const { isLoading } = fundsQuery();
const { isNotSelected: isEmpty, fund } = useSelectedFund();
</script>
