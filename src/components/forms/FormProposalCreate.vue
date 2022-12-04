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
import dayjs from "dayjs";
import { SchemaFormFactory, useSchemaForm } from "formvuelate";
import { onMounted, ref } from "vue";

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

function serialize(value) {
  if (value instanceof Date) {
    return {
      isDate: true,
      date: dayjs(value).format("YYYY-MM-DD"),
    };
  } else {
    return value;
  }
}

function deserialize(value) {
  if (value?.isDate) {
    return dayjs(value.date).toDate();
  } else {
    return value;
  }
}

const formDataSaved = useStorage(`newProposal:${props.challenge.id}:${props.fundHash}`, {}, localStorage, {
  serializer: {
    read: (value) => {
      const parsedValue = value ? JSON.parse(value) : null;
      if (parsedValue) {
        for (const key of Object.keys(parsedValue)) {
          if (Array.isArray(parsedValue[key])) {
            parsedValue[key] = parsedValue[key].map(deserialize);
          } else {
            parsedValue[key] = deserialize(parsedValue[key]);
          }
        }
      }
      return parsedValue;
    },
    write: (value) => {
      const preparedValue = {};
      for (const key of Object.keys(value)) {
        if (Array.isArray(value[key])) {
          preparedValue[key] = value[key].map(serialize);
        } else {
          preparedValue[key] = serialize(value[key]);
        }
      }
      return JSON.stringify(preparedValue);
    },
  },
});
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

  // formDataSaved.value = null;

  // previousPage.go();
}

onMounted(() => {
  for (const key of Object.keys(formDataSaved.value)) {
    formData.value[key] = formDataSaved.value[key];
  }
  syncRef(formData, formDataSaved, { direction: "ltr" });
});
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
