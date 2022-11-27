<template>
  <o-button
    :size="props.size"
    @click="toJson(all, 'My Proposals.json')"
  >
    Export proposals
  </o-button>
</template>

<script setup>
import { sizePropValidator } from "@/components/common/propValidators";
import { useDownload, useProposals } from "@/composables";

const props = defineProps({
  size: {
    type: String,
    default: undefined,
    validator: sizePropValidator,
  },
});

const { all } = useProposals();

const { toJson } = useDownload();
</script>
