<template>
  <o-button
    outlined
    variant="danger"
    :size="props.size"
    @click="onClick"
  >
    Remove proposal
  </o-button>
</template>

<script setup>
import { useRouter } from "vue-router";

import { sizePropValidator } from "@/components/common/propValidators";
import { useProposal } from "@/composables";

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

const router = useRouter();
const { remove } = useProposal(props.proposalId);

function onClick() {
  remove();
  router.push({ name: "proposals:my" });
}
</script>
