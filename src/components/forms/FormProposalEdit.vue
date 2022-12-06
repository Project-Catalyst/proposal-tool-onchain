<template>
  <div class="generated-form">
    <schema-form
      :schema="schema"
      @submit="onSubmit"
      @reset="onReset"
    >
      <template #afterForm>
        <div
          v-if="!isPublished"
          class="buttons"
        >
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

const { instanceFormData, challenge, update, isPublished } = useProposal(props.proposalId);

const formDataSaved = !isPublished.value ? useStorage(
  `editProposal:${props.proposalId}`,
  instanceFormData.value,
  localStorage,
  { serializer: formStorageSerializer },
) : null;

const formData = ref({});

useSchemaForm(formData);

const { schema, reset } = useProposalSchema(
  challenge.proposalSchema, instanceFormData.value, isPublished.value,
);

let SchemaForm = SchemaFormFactory([
  VeeValidatePlugin(),
]);

const previousPage = usePreviousPage({ defaultLocation: { name: "proposals:my" } });

async function onReset() {
  if (!isPublished.value) {
    reset();
    SchemaForm = SchemaFormFactory([
      VeeValidatePlugin(),
    ]);
  }
}

function onSubmit() {
  if (!isPublished.value) {
    update(formData.value);
    formDataSaved.value = null;
    previousPage.go();
  }
}

onMounted(() => {
  if (formDataSaved) {
    for (const key of Object.keys(formDataSaved.value)) {
      formData.value[key] = formDataSaved.value[key];
    }
    syncRef(formData, formDataSaved, { direction: "ltr" });
  }
});
</script>
