<template>
  <wrapper-page
    title="Current Fund"
    :subtitle="selectedFund.fund.value?.title"
    :is-loading="isLoading"
    :is-empty="isEmpty"
  >
    <fund-genesis :fund-hash="selectedFund.hash.value" />

    <template #empty>
      <no-selected-fund />
    </template>
  </wrapper-page>
</template>

<script setup>
import { computed } from "vue";

import FundGenesis from "@/components/info/FundGenesis.vue";
import NoSelectedFund from "@/components/warnings/NoSelectedFund.vue";
import { useFunds, useSelectedFund } from "@/composables";

const funds = useFunds();
const selectedFund = useSelectedFund();

const { isLoading } = funds.query;
const isEmpty = computed(() => !selectedFund.fund.value);
</script>
