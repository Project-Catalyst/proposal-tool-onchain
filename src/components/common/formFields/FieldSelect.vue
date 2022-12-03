<template>
  <field-wrapper
    :label="props.label"
    :help="props.help"
    :required="props.required"
    :validation="props.validation"
  >
    <o-select
      :id="props.uuid"
      v-model="value"
      expanded
      :multiple="props.multiple"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      :disabled="props.disabled"
    >
      <option
        v-if="(!props.required && !props.multiple)"
        value=""
      />

      <option
        v-for="option in props.options"
        :key="option"
      >
        {{ option }}
      </option>
    </o-select>
  </field-wrapper>
</template>

<script setup>
import { ref, watch } from "vue";

import FieldWrapper from "@/components/common/formFields/FieldWrapper.vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  help: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  validation: {
    type: Object,
    default: () => ({}),
  },
  placeholder: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  uuid: {
    type: Number,
    default: 0,
  },
  options: {
    type: Array,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  default: {
    type: [Array, String, null],
    required: true,
  },
  modelValue: {
    type: [Array, String, null],
    required: true,
  },
});

const emit = defineEmits({
  "update:modelValue": (value) => Array.isArray(value) || typeof value === "string" || value === null,
});

const value = ref(props.modelValue);

watch(() => props.modelValue, () => value.value = props.modelValue);
watch(
  value,
  () => emit("update:modelValue", value.value || (typeof props.options[0] === "number" ? null : "")),
);
</script>
