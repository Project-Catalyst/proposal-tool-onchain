<template>
  <vee-form
    v-bind="proposalSchema"
    :is-loading="isLoading"
    @submit="onSubmit"
  />
</template>

<script setup>
import { ref } from "vue";

import { usePreviousPage, useProposals, useProposalSchema } from "@/composables";

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

const previousPage = usePreviousPage({ defaultLocation: { name: "proposals:my" } });

const proposals = useProposals();
const proposalSchema = useProposalSchema(props.challenge.proposalSchema);

const isLoading = ref(false);

async function onSubmit(formData) {
  isLoading.value = true;

  await proposals.create({
    fundHash: props.fundHash,
    challengeId: props.challenge.id,
    ...formData,
  }, props.challenge.proposalSchema);

  isLoading.value = false;

  previousPage.go();
}
</script>
