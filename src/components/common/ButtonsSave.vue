<template>
  <div class="block buttons">
    <o-button
      :icon-left="copied ? 'check' : 'clipboard'"
      :variant="copied ? 'success' : 'info'"
      @click="copy(JSON.stringify(props.source, null, 2))"
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
      @click="toJson(props.source, props.fileName)"
    >
      Save to file
    </o-button>
  </div>
</template>

<script setup>
import { useClipboard } from "@vueuse/core";

import { useDownload } from "@/composables";
const props = defineProps({
  source: {
    type: Object,
    required: true,
  },
  fileName: {
    type: String,
    default: "filename.json",
  },
});

const { copy, copied } = useClipboard({ legacy: true });
const { toJson } = useDownload();
</script>
