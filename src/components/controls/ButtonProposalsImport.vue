<template>
  <o-button
    :size="props.size"
    @click="open"
  >
    Import proposals
  </o-button>
</template>

<script setup>
import { sizePropValidator } from "@/components/common/propValidators";
import { useOpenJsonDialog, useProposals } from "@/composables";

const props = defineProps({
  size: {
    type: String,
    default: undefined,
    validator: sizePropValidator,
  },
});

const { importFromJson } = useProposals();

const { open } = useOpenJsonDialog({ onSuccess: importFromJson });
</script>
