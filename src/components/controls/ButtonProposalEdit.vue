<template>
  <o-button
    tag="router-link"
    :to="{ name: 'proposals:edit', params: {
      proposalId: props.proposalId,
    }}"
    :size="props.size"
  >
    Edit proposal
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
  proposalId: {
    type: String,
    required: true,
  },
});
</script>
