<template>
  <wrapper-page
    title="Edit proposal"
    :subtitle="title"
    :is-loading="isLoading"
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
    </div>
  </wrapper-page>
</template>

<script setup>
import { useRoute } from "vue-router";

import { fundsQuery } from "@/blockchain/queries";
import ButtonProposalPublish from "@/components/controls/ButtonProposalPublish.vue";
import ButtonProposalRemove from "@/components/controls/ButtonProposalRemove.vue";
import FormProposalEdit from "@/components/forms/FormProposalEdit.vue";
import { useProposal } from "@/composables";

const route = useRoute();

const proposalId = route.params.proposalId;

const { title, canPublish, isPublished } = useProposal(proposalId);

const { isLoading } = fundsQuery();
</script>
