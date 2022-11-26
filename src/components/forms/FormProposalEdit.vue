<template>
  <form-vee
    v-bind="proposalSchema"
    @submit="onSubmit"
  />
</template>

<script setup>
import get from "lodash/get";
import { useRouter } from "vue-router";

import { useProposal, useProposalSchema } from "@/composables";

const props = defineProps({
  proposalId: {
    type: String,
    required: true,
  },
});

const router = useRouter();

const { instance: proposal, challenge, update } = useProposal(props.proposalId);
const proposalSchema = useProposalSchema(challenge.proposalSchema, proposal);

function onSubmit(formData) {
  update(formData);

  const previousUrl = get(router, "options.history.state.back");

  if (previousUrl) {
    router.push({ path: previousUrl });
  } else {
    router.push({ name: "proposals:my" });
  }
}
</script>
