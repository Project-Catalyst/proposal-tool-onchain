<template>
  <o-button
    :size="props.size"
    outlined
    variant="danger"
    @click="clear"
  >
    Clear proposals
  </o-button>
</template>

<script setup>
import { sizePropValidator } from "@/components/common/propValidators";
import { useProposals } from "@/composables";

const props = defineProps({
  size: {
    type: String,
    default: undefined,
    validator: sizePropValidator,
  },
});

const { clear } = useProposals();
</script>
