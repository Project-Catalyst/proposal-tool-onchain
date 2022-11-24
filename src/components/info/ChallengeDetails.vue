<template>
  <h3 class="title is-5">
    Description
  </h3>

  <article class="message">
    <div class="message-body">
      {{ stringOrArray(props.challenge.description) }}
    </div>
  </article>

  <h3 class="title is-5">
    Proposal Schema
  </h3>

  <div class="block">
    <proposal-schema-item
      v-for="item in props.challenge.proposalSchema"
      :key="item.label"
      :item="item"
    />
  </div>

  <h3 class="title is-5">
    Genesis JSON
  </h3>

  <div class="block buttons">
    <o-button
      :icon-left="copied ? 'check' : 'clipboard'"
      :variant="copied ? 'success' : 'info'"
      @click="copy(JSON.stringify(props.challenge, null, 2))"
    >
      <span v-if="!copied">
        Copy to clipboard
      </span>

      <span v-else>
        Copied!
      </span>
    </o-button>

    <o-button
      variant="info"
      icon-left="file-download"
      @click="toJson(props.challenge, props.challenge.title)"
    >
      Save to file
    </o-button>
  </div>

  <pre class="block">{{ props.challenge }}</pre>
</template>

<script setup>
import { useClipboard } from "@vueuse/core";

import ProposalSchemaItem from "@/components/info/ProposalSchemaItem.vue";
import { useDownload } from "@/composables";
import { stringOrArray } from "@/utils";

const props = defineProps({
  challenge: {
    type: Object,
    required: true,
  },
});

const { copy, copied } = useClipboard({ legacy: true });
const { toJson } = useDownload();
</script>
