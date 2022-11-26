<template>
  <wrapper-page
    title="New proposal"
    :subtitle="challenge?.title"
    :is-loading="isLoading"
    :is-empty="isEmpty"
  >
    <nav
      class="breadcrumb"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <router-link
            :to="{
              name: 'challenges',
              params: { fundHash: fundHashParam }
            }"
          >
            Challenges
          </router-link>
        </li>

        <li>
          <router-link
            :to="{
              name: 'challenges:challengeDetails',
              params: { fundHash: fundHashParam, challengeId }
            }"
          >
            {{ challenge.title }}
          </router-link>
        </li>

        <li class="is-active">
          <a
            href="#"
            aria-current="page"
          >
            New proposal
          </a>
        </li>
      </ul>
    </nav>

    <form-proposal-create
      :fund-hash="fundHash"
      :challenge="challenge"
    />

    <template #empty>
      <no-selected-fund v-if="fundIsNotSelected" />
      <fund-not-found v-else-if="!fundExists" />
      <challenge-not-found v-else />
    </template>
  </wrapper-page>
</template>

<script setup>
import { computed } from "vue";

import { fundsQuery } from "@/blockchain/queries";
import FormProposalCreate from "@/components/forms/FormProposalCreate.vue";
import ChallengeNotFound from "@/components/warnings/ChallengeNotFound.vue";
import FundNotFound from "@/components/warnings/FundNotFound.vue";
import NoSelectedFund from "@/components/warnings/NoSelectedFund.vue";
import { useChallengeParamPage } from "@/composables";

const {
  challengeExists,
  challengeId,
  challenge,
  fundHash,
  fundHashParam,
  fundExists,
  fundIsNotSelected,
} = useChallengeParamPage();

const { isLoading } = fundsQuery();
const isEmpty = computed(() => !fundExists.value || !challengeExists.value);
</script>
