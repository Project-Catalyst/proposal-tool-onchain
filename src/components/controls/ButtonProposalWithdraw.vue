<template>
  <button-tx-submit
    :size="props.size"
    @submit="withdraw(props.proposalId)"
  >
    Withdraw proposal
  </button-tx-submit>
</template>

<script setup>
import { sizePropValidator } from "@/components/common/propValidators";
import { useProposalWithdrawal } from "@/composables";

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

const { withdraw } = useProposalWithdrawal();
</script>
