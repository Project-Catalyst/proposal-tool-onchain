<template>
  <div class="is-relative">
    <o-loading
      v-if="props.checkLoading"
      v-model:active="isLoading"
      :full-page="false"
    >
      <icon-loading />
    </o-loading>

    <div class="block buttons">
      <o-button
        :icon-left="copied ? 'check' : 'clipboard'"
        :variant="copied ? 'success' : 'info'"
        @click="copy(JSON.stringify(fundGenesis, null, 2))"
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
        @click="toJson(fundGenesis, fundGenesis.title)"
      >
        Save to file
      </o-button>
    </div>

    <pre class="block">{{ fundGenesis }}</pre>
  </div>
</template>

<script setup>
import { useClipboard } from "@vueuse/core";
import { computed } from "vue";

import { useDownload, useFunds } from "@/composables";

const props = defineProps({
  fundHash: {
    type: String,
    required: true,
  },
  checkLoading: {
    type: Boolean,
    default: false,
  },
});

const funds = useFunds();

const { isLoading } = funds.query;

const fundGenesis = computed(() => funds.getByHash(props.fundHash)?.fundGenesis);

const { copy, copied } = useClipboard({ legacy: true });
const { toJson } = useDownload();
</script>
