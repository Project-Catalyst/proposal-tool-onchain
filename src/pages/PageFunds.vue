<template>
  <wrapper-page
    title="Funds"
    :is-loading="isLoading"
  >
    <select-fund class="mb-4" />

    <table-funds />
  </wrapper-page>
</template>

<script setup>
import { fundsQuery } from "@/blockchain/queries";
import SelectFund from "@/components/controls/SelectFund.vue";
import TableFunds from "@/components/tables/TableFunds.vue";

const { isLoading } = fundsQuery();
</script>
