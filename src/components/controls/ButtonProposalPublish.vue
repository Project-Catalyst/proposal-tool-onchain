<template>
  <button-tx-submit
    :size="props.size"
    @submit="publish(props.proposalId)"
  >
    Publish proposal
  </button-tx-submit>
</template>

<script setup>
import { sizePropValidator } from "@/components/common/propValidators";
import { useProposalPublication } from "@/composables";

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

const { publish } = useProposalPublication();
</script>
