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
      class="number-input"
      type="number"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      :disabled="props.disabled"
      @blur="onBlur"
    />

    <o-button
      v-if="props.step"
      :disabled="+props.modelValue <= props.min"
      icon-right="minus"
      variant="primary"
      @click="decrement"
    />

    <o-button
      v-if="props.step"
      :disabled="+props.modelValue >= props.max"
      icon-right="plus"
      variant="primary"
      @click="increment"
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
    type: [Number, null],
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
  decimals: {
    type: Number,
    default: 0,
  },
  zerofill: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits({
  ["update:modelValue"]: (value) => value === null || typeof value === "string",
});

const value = ref(props.modelValue);

watch(() => props.modelValue, () => value.value = props.modelValue === "" ? null : props.modelValue);
watch(value, () => emit("update:modelValue", value.value));

function decrement() {
  const newValue = Math.min(props.max, Math.max(props.min, +value.value - props.step));
  value.value = props.decimals ? newValue.toFixed(props.decimals) : newValue.toString();
}

function increment() {
  const newValue = Math.max(props.min, Math.min(props.max, +value.value + props.step));
  value.value = props.decimals ? newValue.toFixed(props.decimals) : newValue.toString();
}

function onBlur() {
  if (value.value && props.decimals && props.zerofill) {
    value.value = parseFloat(value.value).toFixed(props.decimals);
  }
}
</script>

<style lang="scss">
.number-input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    -webkit-appearance: none;
  }
}
</style>
