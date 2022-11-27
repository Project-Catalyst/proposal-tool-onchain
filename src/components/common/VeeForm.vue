<template>
  <Form
    :validation-schema="props.validationSchema"
    :initial-values="props.initialValues"
    @submit="(values) => emit('submit', values)"
  >
    <div class="block">
      <Field
        v-for="field in props.fields"
        v-slot="{ field: veeField, errors, meta }"
        :key="field.name"
        :type="field.type"
        :name="field.name"
        :value="field.value"
      >
        <o-field
          :class="{required: field.required}"
          :label="field.label"
          :variant="errors[0] ? 'danger' : meta.valid && meta.dirty ? 'success' : ''"
          :message="`${errors[0] ? errors[0] : ''}${errors[0] && field.help ? `\n` : ''}${field.help}`"
        >
          <o-checkbox
            v-if="field.type === 'checkbox'"
            v-model="veeField.value"
            :class="{'no-pointer-events': props.isLoading || props.isReadOnly}"
            v-bind="veeField"
            indeterminate
          />

          <o-input
            v-else
            v-model="veeField.value"
            :readonly="props.isLoading || props.isReadOnly"
            v-bind="veeField"
          />
        </o-field>
      </Field>
    </div>

    <div
      v-if="!props.isReadOnly"
      class="block buttons"
    >
      <o-button
        variant="primary"
        native-type="submit"
        :disabled="props.isLoading"
      >
        <icon-loading v-if="props.isLoading" />

        <span>
          Submit
        </span>
      </o-button>

      <o-button
        native-type="reset"
        :disabled="props.isLoading"
      >
        Reset
      </o-button>
    </div>
  </Form>
</template>

<script setup>
import { Field, Form } from "vee-validate";

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  validationSchema: {
    type: Object,
    required: true,
  },
  initialValues: {
    type: Object,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isReadOnly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits({
  submit: (values) => !!values,
});
</script>
