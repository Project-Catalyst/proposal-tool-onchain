<template>
  <field-wrapper
    class="quill-wrapper"
    :label="props.label"
    :help="props.help"
    :required="props.required"
    :validation="props.validation"
  >
    <quill-editor
      :id="props.uuid"
      v-model:content="value"
      theme="snow"
      :readonly="props.readonly"
      :enable="!props.disabled"
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
    type: Object,
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits({
  "update:modelValue": (value) => typeof value === "object",
});

const value = ref(props.modelValue);

watch(() => props.modelValue, () => value.value = props.modelValue);
watch(value, () => emit("update:modelValue", value.value));
</script>

<style>
.quill-wrapper {
  margin-bottom: 90px;
}
</style>
