<template>
  <div class="proposal-schema-item">
    <p>
      <strong>• {{ stringOrArray(props.item.label) }}</strong>
    </p>

    <p>
      Type: <span class="item-type mx-2">{{ props.item.type }}</span>

      <span
        v-if="props.item.required"
        class="tag is-danger is-light"
      >
        * Required
      </span>
      <span
        v-else
        class="tag"
      >
        Optional
      </span>
    </p>

    <p v-if="props.item.description">
      <em>{{ stringOrArray(props.item.description) }}</em>
    </p>
  </div>
</template>

<script setup>
import { stringOrArray } from "@/utils";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss">
.proposal-schema-item {
  margin-bottom: 1rem;

  .item-type {
    font-family: monospace, monospace;
  }
}
</style>
