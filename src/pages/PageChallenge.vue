<template>
  <wrapper-page
    title="Challenge"
    :subtitle="challenge?.title"
    :is-loading="isLoading"
    :is-empty="isEmpty"
  >
    <challenge-details :challenge="challenge" />

    <template #empty>
      <no-selected-fund />
    </template>
  </wrapper-page>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { fundsQuery } from "@/blockchain/queries";
import ChallengeDetails from "@/components/info/ChallengeDetails.vue";
import NoSelectedFund from "@/components/warnings/NoSelectedFund.vue";
import { useChallenges, useSelectedFund } from "@/composables";

const route = useRoute();
const { id } = route.params;

const { ids, getById } = useChallenges();
const selectedFund = useSelectedFund();

const { isLoading } = fundsQuery();

const isEmpty = computed(() => !isLoading.value && (!selectedFund.fund.value || !ids.value.includes(+id)));

const challenge = getById(+id);
</script>
