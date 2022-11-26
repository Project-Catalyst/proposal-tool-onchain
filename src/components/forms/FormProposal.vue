<template>
  <form-vee
    v-bind="proposalSchema"
    @submit="onSubmit"
  />
</template>

<script setup>
import { useProposalSchema } from "@/composables";

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

const proposalSchema = useProposalSchema(props.challenge.proposalSchema);

function onSubmit(formData) {
  console.log(formData);
}
</script>
