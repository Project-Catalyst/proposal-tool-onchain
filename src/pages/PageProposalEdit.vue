<template>
  <wrapper-page
    title="Edit proposal"
    :subtitle="title"
    :is-loading="isLoading"
    :is-empty="isEmpty"
    check-first="empty"
  >
    <nav
      class="breadcrumb"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <router-link :to="{ name: 'proposals:my' }">
            My Proposals
          </router-link>
        </li>

        <li class="is-active">
          <a
            href="#"
            aria-current="page"
          >
            Edit proposal
          </a>
        </li>
      </ul>
    </nav>

    <div class="block">
      <form-proposal-edit :proposal-id="proposalId" />
    </div>

    <div class="block buttons">
      <button-proposal-remove
        v-if="!isPublished"
        :proposal-id="proposalId"
      />

      <button-proposal-publish
        v-if="canPublish"
        :proposal-id="proposalId"
      />

      <button-ipfs-link
        v-if="isPublished"
        :cid="cid"
      />

      <button-proposal-withdraw
        v-if="canWithdraw"
        :proposal-id="proposalId"
      />
    </div>

    <template #empty>
      <wallet-is-not-ready />
    </template>
  </wrapper-page>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { fundsQuery, proposalsPublishedQuery, proposalsWithdrawnQuery } from "@/blockchain/queries";
import ButtonIpfsLink from "@/components/common/ButtonIpfsLink.vue";
import ButtonProposalPublish from "@/components/controls/ButtonProposalPublish.vue";
import ButtonProposalRemove from "@/components/controls/ButtonProposalRemove.vue";
import ButtonProposalWithdraw from "@/components/controls/ButtonProposalWithdraw.vue";
import FormProposalEdit from "@/components/forms/FormProposalEdit.vue";
import WalletIsNotReady from "@/components/warnings/WalletIsNotReady.vue";
import { useConnectedWallet,useProposal } from "@/composables";

const route = useRoute();

const proposalId = route.params.proposalId;

const { title, cid, canPublish, canWithdraw, isPublished } = useProposal(proposalId);

const { isReady } = useConnectedWallet();
const { isLoading: isFundsLoading } = fundsQuery();
const { isLoading: isProposalsPublishedLoading } = proposalsPublishedQuery();
const { isLoading: isProposalsWithdrawnLoading } = proposalsWithdrawnQuery();

const isLoading = computed(
  () => isFundsLoading.value || isProposalsPublishedLoading.value || isProposalsWithdrawnLoading.value,
);

const isEmpty = computed(() => !isReady.value);
</script>
