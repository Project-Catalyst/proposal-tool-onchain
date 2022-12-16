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
      <pre>{{ fundsSelected }}</pre>
    </div>
  </wrapper-page>
</template>

<script setup>
import { ref } from "vue";

import { fundsQuery } from "@/blockchain/queries";
import SelectFunds from "@/components/controls/SelectFunds.vue";

const { isLoading: isFundsLoading } = fundsQuery();

const fundsSelected = ref([]);
</script>
