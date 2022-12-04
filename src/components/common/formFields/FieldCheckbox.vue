<template>
  <field-wrapper
    :label="props.label"
    :help="props.help"
    :required="props.required"
    :validation="props.validation"
  >
    <o-checkbox
      :id="props.uuid"
      v-model="value"
      :class="{'no-pointer-events': props.readonly}"
      :indeterminate="(props.default === undefined && value === undefined)"
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
    type: Boolean,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
});

const emit = defineEmits({
  "update:modelValue": (value) => value === undefined || typeof value === "boolean",
});

const value = ref(props.modelValue);

watch(() => props.modelValue, () => value.value = props.modelValue);
watch(value, () => emit("update:modelValue", value.value));
</script>
