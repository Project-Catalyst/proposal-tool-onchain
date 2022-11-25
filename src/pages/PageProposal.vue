<template>
  <wrapper-page
    title="Proposal"
    :subtitle="challenge?.title"
    :is-loading="isLoading || !challenge"
  >
    <form-proposal :challenge-id="challengeId" />
  </wrapper-page>
</template>

<script setup>
import { useRoute } from "vue-router";

import { fundsQuery } from "@/blockchain/queries";
import FormProposal from "@/components/forms/FormProposal.vue";
import { useChallenges } from "@/composables";

const route = useRoute();
const { challengeId } = route.params;

const { getById } = useChallenges();
const { isLoading } = fundsQuery();

console.log(challengeId);

const challenge = getById(challengeId);
</script>
