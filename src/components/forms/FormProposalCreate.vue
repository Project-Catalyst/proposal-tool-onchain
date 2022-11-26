<template>
  <form-vee
    v-bind="proposalSchema"
    @submit="onSubmit"
  />
</template>

<script setup>
import get from "lodash/get";
import { useRouter } from "vue-router";

import { useProposals, useProposalSchema } from "@/composables";

const props = defineProps({
  fundHash: {
    type: String,
    required: true,
  },
  challenge: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const proposals = useProposals();
const proposalSchema = useProposalSchema(props.challenge.proposalSchema);

function onSubmit(formData) {
  proposals.create({
    fundHash: props.fundHash,
    challengeId: props.challenge.id,
    ...formData,
  }, props.challenge.proposalSchema);

  const previousUrl = get(router, "options.history.state.back");

  if (previousUrl) {
    router.push({ path: previousUrl });
  } else {
    router.push({ name: "proposals:my" });
  }
}
</script>
