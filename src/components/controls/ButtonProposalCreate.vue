<template>
  <o-button
    tag="router-link"
    :to="{ name: 'challenges:proposal:create', params: {
      fundHash: props.fundHash,
      challengeId: props.challengeId,
    }}"
    :size="props.size"
  >
    {{ buttonLabel }}
  </o-button>
</template>

<script setup>
import { sizePropValidator } from "@/components/common/propValidators";

const props = defineProps({
  size: {
    type: String,
    default: undefined,
    validator: sizePropValidator,
  },
  fundHash: {
    type: String,
    required: true,
  },
  challengeId: {
    type: String,
    required: true,
  },
});

const buttonLabel = props.proposalId ? "Edit Proposal" : "Create new proposal";
</script>
