<template>
  <wrapper-page
    title="On-Chain Proposals"
    subtitle="Published proposals for given fund(s)"
    :is-loading="isFundsLoading"
  >
    <div class="block">
      <select-funds v-model="fundsSelected" />
    </div>

    <div class="block">
      <table-on-chain-proposals :fund-hashes="fundHashes" />
    </div>
  </wrapper-page>
</template>

<script setup>
import { computed, ref } from "vue";

import { fundsQuery } from "@/blockchain/queries";
import SelectFunds from "@/components/controls/SelectFunds.vue";
import TableOnChainProposals from "@/components/tables/TableOnChainProposals.vue";

const { isLoading: isFundsLoading } = fundsQuery();

const fundsSelected = ref([]);

const fundHashes = computed(() => fundsSelected.value.map(({ hash }) => hash));
</script>
