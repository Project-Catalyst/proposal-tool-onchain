<template>
  <o-field
    :class="{
      required: props.required,
    }"
    :label="props.label"
    :variant="variant"
    :clearable="!props.required"
  >
    <slot />

    <template #message>
      <p>
        {{ props.help }}
      </p>

      <ul v-if="props.validation.errors.length">
        <li
          v-for="error in props.validation.errors"
          :key="error"
        >
          {{ error }}
        </li>
      </ul>
    </template>
  </o-field>
</template>

<script setup>
import { computed } from "vue";

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
});

const variant = computed(() => {
  if (props.validation.errorMessage) {
    return "danger";
  } else if (props.validation.meta.valid && props.validation.meta.dirty) {
    return "success";
  }
  return "";
});
</script>
