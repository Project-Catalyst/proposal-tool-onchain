<template>
  <o-button
    tag="router-link"
    :to="{ name: 'challenges:proposal:create', params: {
      fundHash: props.fundHashParam,
      challengeId: props.challengeId,
    }}"
    :size="props.size"
  >
    Create proposal
  </o-button>
</template>

<script setup>
import { sizePropValidator } from "@/components/common/propValidators";

const props = defineProps({
  size: {
    type: String,
    default: undefined,
    validator: sizePropValidator,
  },
  fundHashParam: {
    type: String,
    required: true,
  },
  challengeId: {
    type: String,
    required: true,
  },
});
</script>
