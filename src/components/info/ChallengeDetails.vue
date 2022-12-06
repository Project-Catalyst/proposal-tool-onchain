<template>
  <h3 class="title is-5">
    Description
  </h3>

  <article class="message">
    <div class="message-body">
      {{ stringOrArray(props.challenge.description) }}
    </div>
  </article>

  <div class="block">
    <button-proposal-create
      size="medium"
      :fund-hash-param="props.fundHashParam"
      :challenge-id="props.challenge.id.toString()"
    />
  </div>

  <h3 class="title is-5">
    Proposal Schema
  </h3>

  <div class="block">
    <proposal-schema-item
      v-for="item in props.challenge.proposalSchema"
      :key="item.codeName"
      :item="item"
    />
  </div>

  <h3 class="title is-5">
    Genesis JSON
  </h3>

  <buttons-save
    :source="props.challenge"
    :file-name="props.challenge?.title"
  />

  <pre class="block">{{ props.challenge }}</pre>
</template>

<script setup>
import ButtonProposalCreate from "@/components/controls/ButtonProposalCreate.vue";
import ProposalSchemaItem from "@/components/info/ProposalSchemaItem.vue";
import { stringOrArray } from "@/utils";

const props = defineProps({
  fundHashParam: {
    type: String,
    required: true,
  },
  challenge: {
    type: Object,
    required: true,
  },
});
</script>
