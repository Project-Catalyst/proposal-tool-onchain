<template>
  <o-button
    :size="props.size"
    @click="onClick"
  >
    {{ buttonLabel }}
  </o-button>
</template>

<script setup>
import { useRouter } from "vue-router";

import { sizePropValidator } from "@/components/common/propValidators";

const router = useRouter();

const props = defineProps({
  size: {
    type: String,
    default: undefined,
    validator: sizePropValidator,
  },
  challengeId: {
    type: String,
    required: true,
  },
  proposalId: {
    type: String,
    default: "",
  },
});

const buttonLabel = props.proposalId ? "Edit Proposal" : "Add Proposal";

function onClick() {
  if (props.proposalId) {
    router.push({
      name: "proposal:edit",
      params: { challengeId: props.challengeId, proposalId: props.proposalId },
    });
  } else {
    router.push({
      name: "proposal:add",
      params: { challengeId: props.challengeId },
    });
  }
}
</script>
