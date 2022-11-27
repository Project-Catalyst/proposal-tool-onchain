<template>
  <wrapper-page
    title="My Proposals"
    :is-loading="isLoading"
  >
    <div class="block">
      <table-my-proposals />
    </div>

    <div class="block buttons">
      <button-proposals-import />
      <button-proposals-export v-if="count > 0" />
    </div>
  </wrapper-page>
</template>

<script setup>
import { fundsQuery } from "@/blockchain/queries";
import ButtonProposalsExport from "@/components/controls/ButtonProposalsExport.vue";
import ButtonProposalsImport from "@/components/controls/ButtonProposalsImport.vue";
import TableMyProposals from "@/components/tables/TableMyProposals.vue";
import { useProposals } from "@/composables";

const { isLoading } = fundsQuery();
const { count } = useProposals();

</script>
