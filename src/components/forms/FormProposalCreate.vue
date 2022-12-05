<template>
  <div class="generated-form">
    <schema-form
      :schema="schema"
      @submit="onSubmit"
      @reset="onReset"
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
import { syncRef, useStorage } from "@vueuse/core";
import { SchemaFormFactory, useSchemaForm } from "formvuelate";
import { onMounted, ref } from "vue";

import { usePreviousPage, useProposals, useProposalSchema } from "@/composables";
import { formStorageSerializer } from "@/utils";

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

const formDataSaved = useStorage(
  `newProposal:${props.challenge.id}:${props.fundHash}`,
  {},
  localStorage,
  { serializer: formStorageSerializer },
);
const formData = ref({});

useSchemaForm(formData);

const { schema, reset } = useProposalSchema(props.challenge.proposalSchema);

let SchemaForm = SchemaFormFactory([
  VeeValidatePlugin(),
]);

const proposals = useProposals();
const previousPage = usePreviousPage({ defaultLocation: { name: "proposals:my" } });

const isLoading = ref(false);

async function onReset() {
  reset();
  SchemaForm = SchemaFormFactory([
    VeeValidatePlugin(),
  ]);
}

async function onSubmit() {
  isLoading.value = true;

  await proposals.create({
    fundHash: props.fundHash,
    challengeId: props.challenge.id,
    ...formData.value,
  }, props.challenge.proposalSchema);

  isLoading.value = false;

  formDataSaved.value = null;

  previousPage.go();
}

onMounted(() => {
  for (const key of Object.keys(formDataSaved.value)) {
    formData.value[key] = formDataSaved.value[key];
  }
  syncRef(formData, formDataSaved, { direction: "ltr" });
});
</script>
