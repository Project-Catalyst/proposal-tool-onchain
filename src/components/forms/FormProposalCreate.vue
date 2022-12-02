<template>
  <div class="generated-form">
    <schema-form
      :schema="schema"
      @submit="onSubmit"
    >
      <template #afterForm>
        <div class="buttons">
          <o-button
            variant="primary"
            native-type="submit"
            :disabled="isLoading"
          >
            <icon-loading v-if="isLoading" />
            <span>Submit</span>
          </o-button>

          <o-button
            native-type="reset"
            :disabled="isLoading"
          >
            <span>Reset</span>
          </o-button>
        </div>
      </template>
    </schema-form>
  </div>
</template>

<script setup>
import VeeValidatePlugin from "@formvuelate/plugin-vee-validate";
import { SchemaFormFactory, useSchemaForm } from "formvuelate";
import { ref } from "vue";

import { /* usePreviousPage, useProposals, */ useProposalSchema } from "@/composables";

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

const formData = ref({});
const { schema } = useProposalSchema(props.challenge.proposalSchema);

useSchemaForm(formData);

const SchemaForm = SchemaFormFactory([
  VeeValidatePlugin(),
]);


// const proposals = useProposals();
// const previousPage = usePreviousPage({ defaultLocation: { name: "proposals:my" } });

const isLoading = ref(false);

async function onSubmit() {
  console.log(formData.value);
  // isLoading.value = true;

  // await proposals.create({
  //   fundHash: props.fundHash,
  //   challengeId: props.challenge.id,
  //   ...formData,
  // }, props.challenge.proposalSchema);

  // isLoading.value = false;

  // previousPage.go();
}
</script>

<style lang="scss">
.generated-form form {
  .schema-row {
    display: flex;
    gap: 1em;

    & + .buttons {
      margin-top: 1.5rem;
    }

    & > .schema-col {
      flex-grow: 1;
      flex-basis: 100%;
    }
  }
}
</style>
