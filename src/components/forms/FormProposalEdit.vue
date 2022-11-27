<template>
  <vee-form
    v-bind="proposalSchema"
    :is-read-only="isPublished"
    @submit="onSubmit"
  />
</template>

<script setup>
import { usePreviousPage, useProposal, useProposalSchema } from "@/composables";

const props = defineProps({
  proposalId: {
    type: String,
    required: true,
  },
});

const previousPage = usePreviousPage({ defaultLocation: { name: "proposals:my" } });

const { instance: proposal, challenge, update, isPublished } = useProposal(props.proposalId);
const proposalSchema = useProposalSchema(challenge.proposalSchema, proposal);

function onSubmit(formData) {
  update(formData);
  previousPage.go();
}
</script>
