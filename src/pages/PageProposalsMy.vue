<template>
  <wrapper-page
    title="My Proposals"
    :is-loading="isLoading"
  >
    <table-my-proposals />
  </wrapper-page>
</template>

<script setup>
import { fundsQuery } from "@/blockchain/queries";
import TableMyProposals from "@/components/tables/TableMyProposals.vue";

const { isLoading } = fundsQuery();
</script>
