<template>
  <field-wrapper
    :label="props.label"
    :help="props.help"
    :required="props.required"
    :validation="props.validation"
  >
    <o-slider
      :id="props.uuid"
      v-model="value"
      tooltip-always
      :readonly="props.readonly"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :disabled="props.disabled"
      :variant="variant"
    />
  </field-wrapper>
</template>

<script setup>
import { computed, ref, watch } from "vue";

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
    type: Array,
    required: true,
  },
  min: {
    type: Number,
    default: Number.MIN_SAFE_INTEGER,
  },
  max: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  },
  step: {
    type: Number,
    default: 1,
  },
  modelValue: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits({
  "update:modelValue": (value) => Array.isArray(value),
});

const value = ref(props.modelValue);

const variant = computed(() => props.validation.meta.valid ? "primary" : "danger");

watch(() => props.modelValue, () => value.value = props.modelValue);
watch(
  value,
  () => {
    if (!props.readonly) {
      emit("update:modelValue", value.value);
    }
  },
);
</script>

<style>
.label + .b-slider {
  margin-top: 50px;
}
</style>
