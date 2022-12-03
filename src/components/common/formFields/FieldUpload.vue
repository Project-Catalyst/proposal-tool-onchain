<template>
  <field-wrapper
    class="file-upload-wrapper"
    :label="props.label"
    :help="props.help"
    :required="props.required"
    :validation="props.validation"
  >
    <o-upload
      :id="props.uuid"
      v-model="value"
      drag-drop
      expanded
      :multiple="props.multiple"
      :accept="props.accept"
      :readonly="props.readonly"
      :disabled="props.disabled"
    >
      <section class="has-text-centered">
        <p>
          <o-icon
            icon="upload"
            size="is-large"
          />
        </p>
        <p>
          Drop your files here or click to upload
        </p>
      </section>
    </o-upload>

    <ul
      v-if="value"
      class="tags"
    >
      <li
        v-for="(file, index) in (Array.isArray(value) ? value : [value])"
        :key="index"
      >
        <o-button
          icon-left="times"
          size="small"
          native-type="button"
          @click="deleteFile(index)"
        />
        {{ file.name }}
      </li>
    </ul>
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
  accept: {
    type: String,
    default: null,
  },
  multiple: {
    type: Boolean,
    required: false,
  },
  default: {
    type: [Array, File, null],
    required: true,
  },
  modelValue: {
    type: [Array, File, null],
    required: true,
  },
});

const emit = defineEmits({
  "update:modelValue": (value) => Array.isArray(value) || value === null || value instanceof File,
});

const value = ref(props.modelValue);

watch(() => props.modelValue, () => value.value = props.modelValue);
watch(value, () => emit("update:modelValue", value.value));

function deleteFile(index) {
  if (Array.isArray(value.value)) {
    value.value.splice(index, 1);
  } else {
    value.value = null;
  }
}
</script>

<style lang="scss">
.file-upload-wrapper .control .field {
  display: flex;
  flex-flow: column;

  .tags {
    margin-top: 0.5em;
    display: flex;
    flex-flow: column;
    align-items: flex-start;

    & > * {
      margin-top: 0.25em;
    }
  }
}
</style>
