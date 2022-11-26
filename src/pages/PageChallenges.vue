<template>
  <wrapper-page
    title="Challenges"
    :subtitle="genesis?.title"
    :is-loading="isLoading"
    :is-empty="isEmpty"
  >
    <table-challenges :fund-hash-param="fundHashParam" />

    <template #empty>
      <no-selected-fund v-if="fundIsNotSelected" />
      <fund-not-found v-else />
    </template>
  </wrapper-page>
</template>

<script setup>
import { computed } from "vue";

import { fundsQuery } from "@/blockchain/queries";
import TableChallenges from "@/components/tables/TableChallenges.vue";
import FundNotFound from "@/components/warnings/FundNotFound.vue";
import NoSelectedFund from "@/components/warnings/NoSelectedFund.vue";
import { useFundParamPage } from "@/composables";

const { fundHashParam, fundExists, genesis, fundIsNotSelected } = useFundParamPage();

const { isLoading } = fundsQuery();
const isEmpty = computed(() => !fundExists.value);
</script>
