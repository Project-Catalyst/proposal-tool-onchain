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
          >
            <span>Submit</span>
          </o-button>

          <o-button
            native-type="reset"
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

import { usePreviousPage, useProposal, useProposalSchema } from "@/composables";
import { formStorageSerializer } from "@/utils";

const props = defineProps({
  proposalId: {
    type: String,
    required: true,
  },
});

const { instanceFormData, challenge, update } = useProposal(props.proposalId);

const formDataSaved = useStorage(
  `editProposal:${props.proposalId}`,
  instanceFormData.value,
  localStorage,
  { serializer: formStorageSerializer },
);
const formData = ref({});

useSchemaForm(formData);

const { schema, reset } = useProposalSchema(challenge.proposalSchema, instanceFormData.value);

let SchemaForm = SchemaFormFactory([
  VeeValidatePlugin(),
]);

const previousPage = usePreviousPage({ defaultLocation: { name: "proposals:my" } });

async function onReset() {
  reset();
  SchemaForm = SchemaFormFactory([
    VeeValidatePlugin(),
  ]);
}

function onSubmit() {
  update(formData.value);
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
