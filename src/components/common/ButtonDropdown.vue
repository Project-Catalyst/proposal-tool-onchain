<template>
  <o-button
    :size="props.size"
    :variant="props.variant"
  >
    <icon-loading v-if="props.isLoading" />

    <span>
      <slot />
    </span>

    <o-icon :icon="props.isActive ? 'angle-up' : 'angle-down'" />
  </o-button>
</template>

<script setup>
import { sizePropValidator, variantPropValidator } from "@/components/common/propValidators";

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: undefined,
    validator: sizePropValidator,
  },
  variant: {
    type: String,
    default: undefined,
    validator: variantPropValidator,
  },
});
</script>
