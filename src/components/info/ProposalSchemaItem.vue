<template>
  <template v-if="Array.isArray(props.item)">
    <proposal-schema-item
      v-for="childItem in props.item"
      :key="childItem.codeName"
      :item="childItem"
    />
  </template>

  <div
    v-else
    class="proposal-schema-item"
  >
    <p>
      <strong class="mr-2">• {{ stringOrArray(props.item.label) }}</strong>
      <span
        v-if="props.item.meta.required"
        class="tag is-danger is-light"
      >
        * Required
      </span>
      <span
        v-else
        class="tag is-success is-light"
      >
        Optional
      </span>

      <span
        v-if="props.item.meta.hidden"
        class="tag is-dark ml-2"
      >
        Hidden
      </span>

      <span
        v-else-if="props.item.meta.auto"
        class="tag is-dark ml-2"
      >
        Auto-generated
      </span>
    </p>

    <p>
      Code name: <span class="is-family-monospace mx-2">{{ props.item.codeName }}</span>
    </p>

    <p>
      Type: <span class="is-family-monospace mx-2">{{ props.item.type }}</span>
    </p>

    <template v-if="props.item.meta">
      <p v-if="props.item.meta.description">
        <em>{{ stringOrArray(props.item.meta.description) }}</em>
      </p>

      <pre v-if="!isEmpty(conditions)">{{ conditions }}</pre>
    </template>
  </div>
</template>

<script setup>
import isEmpty from "lodash/isEmpty";
import omit from "lodash/omit";

import { stringOrArray } from "@/utils";

import ProposalSchemaItem from "./ProposalSchemaItem.vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const conditions = omit(props.item.meta, ["description", "required", "auto", "hidden", "placeholder"]);
</script>

<style lang="scss">
.proposal-schema-item {
  margin-bottom: 1rem;
}
</style>
