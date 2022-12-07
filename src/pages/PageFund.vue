<template>
  <wrapper-page
    title="Fund"
    :subtitle="genesis?.title"
    :is-loading="isLoading"
    :is-empty="isEmpty"
  >
    <nav
      class="breadcrumb"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <router-link :to="{ name: 'funds:list' }">
            Funds
          </router-link>
        </li>

        <li class="is-active">
          <a
            href="#"
            aria-current="page"
          >
            {{ fundHash }}
          </a>
        </li>
      </ul>
    </nav>

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

const { fundExists, fundHash, genesis, fundIsNotSelected } = useFundParamPage();

const { isLoading } = fundsQuery();
const isEmpty = computed(() => !fundExists.value);
</script>
