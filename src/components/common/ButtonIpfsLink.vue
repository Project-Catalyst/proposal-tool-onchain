<template>
  <o-button
    tag="a"
    :size="props.size"
    :variant="props.variant"
    :href="href"
    target="_blank"
  >
    <span>
      Open in IPFS
    </span>
  </o-button>
</template>

<script setup>
import { sizePropValidator, variantPropValidator } from "@/components/common/propValidators";

const props = defineProps({
  cid: {
    type: String,
    required: true,
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

const href = `${import.meta.env["VITE_IPFS_URL"]}/${props.cid}`;
</script>
