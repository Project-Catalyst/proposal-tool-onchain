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
      ref="editor"
      v-model:content="value"
      theme="snow"
      :read-only="props.readonly"
      :enable="!props.disabled"
    />
  </field-wrapper>
</template>

<script setup>
import { watchOnce } from "@vueuse/shared";
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
    type: [Object, String],
    required: true,
  },
  modelValue: {
    type: [Object, String],
    required: true,
  },
});

const editor = ref(null);

const emit = defineEmits({
  "update:modelValue": (value) => typeof value === "string",
});

const value = ref(props.modelValue);

watch(
  value,
  () => {
    emit("update:modelValue", editor.value.getHTML());
  },
);

watchOnce(
  () => props.modelValue,
  () => {
    if (typeof props.modelValue === "string") {
      editor.value.setHTML(props.modelValue);
    }
  },
);
</script>

<style>
.quill-wrapper {
  margin-bottom: 90px;
}
</style>
