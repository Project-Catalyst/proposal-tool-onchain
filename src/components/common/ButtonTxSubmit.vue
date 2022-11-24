<template>
  <tooltip-if
    label="Please connect a wallet"
    :is-enabled="!isConnected"
  >
    <o-button
      :size="props.size"
      :variant="props.variant"
      :disabled="isBusy || !isConnected"
      @click="emit('submit')"
    >
      <icon-loading v-if="isBusy" />

      <span>
        <slot />
      </span>
    </o-button>
  </tooltip-if>
</template>

<script setup>
import { sizePropValidator, variantPropValidator } from "@/components/common/propValidators";
import { useConnectedWallet } from "@/composables";

const props = defineProps({
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

const emit = defineEmits({
  submit: () => true,
});

const { isBusy, isConnected } = useConnectedWallet();
</script>
