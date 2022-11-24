<template>
  <o-tooltip
    v-if="props.isEnabled"
    :label="props.label"
  >
    <slot />
  </o-tooltip>

  <template v-else>
    <slot />
  </template>
</template>

<script setup>
const props = defineProps({
  isEnabled: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>
