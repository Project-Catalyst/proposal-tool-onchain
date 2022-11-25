<template>
  <wrapper-page
    title="Fund"
    :subtitle="genesis?.title"
    :is-loading="isLoading"
    :is-empty="isEmpty"
  >
    <h3 class="title is-5">
      Genesis JSON
    </h3>

    <fund-genesis :genesis="genesis" />

    <template #empty>
      <no-selected-fund v-if="fundIsNotSelected" />
      <fund-not-found v-else />
    </template>
  </wrapper-page>
</template>

<script setup>
import { computed } from "vue";

import { fundsQuery } from "@/blockchain/queries";
import FundGenesis from "@/components/info/FundGenesis.vue";
import FundNotFound from "@/components/warnings/FundNotFound.vue";
import NoSelectedFund from "@/components/warnings/NoSelectedFund.vue";
import { useFundParamPage } from "@/composables";

const { fundExists, genesis, fundIsNotSelected } = useFundParamPage();

const { isLoading } = fundsQuery();
const isEmpty = computed(() => !fundExists.value);
</script>
