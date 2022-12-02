<template>
  <field-wrapper
    :label="props.label"
    :help="props.help"
    :required="props.required"
    :validation="props.validation"
  >
    <o-input
      :id="props.uuid"
      v-model="value"
      expanded
      :type="props.type"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      :disabled="props.disabled"
    />
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
  type: {
    type: String,
    default: "text",
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
  default: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits({
  "update:modelValue": (value) => typeof value === "string",
});

const value = ref(props.modelValue);

watch(() => props.modelValue, () => value.value = props.modelValue);
watch(value, () => emit("update:modelValue", value.value));
</script>
