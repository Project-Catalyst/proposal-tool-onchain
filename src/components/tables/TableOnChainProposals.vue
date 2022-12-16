<!-- eslint-disable vue/no-textarea-mustache -->
<template>
  <template v-if="hashes.length">
    <div
      v-if="isLoading"
      class="has-text-centered mt-6"
    >
      <icon-loading />
    </div>

    <div
      v-else-if="isError"
      class="has-text-centered mt-6"
    >
      <o-icon
        icon="exclamation-triangle"
        variant="danger"
        size="large"
      />
      <br>
      <span class="has-text-danger">
        Error loading proposals
      </span>
    </div>

    <template v-else>
      <div v-if="proposals.length">
        <o-table
          detailed
          show-detail-icon
          :data="proposals"
        >
          <o-table-column
            v-slot="data"
            field="fund"
            label="Fund"
          >
            {{ mapHashTitle[data.row.json.payload.fundHash] }}
          </o-table-column>

          <o-table-column
            v-slot="data"
            field="proposal"
            label="Proposal"
          >
            {{ mapChallengeTitles[data.row.json.payload.fundHash][data.row.json.payload.challengeId] }}
          </o-table-column>

          <o-table-column
            v-slot="data"
            field="date"
            label="Published at"
          >
            {{ data.row.tx.block.time }}
          </o-table-column>

          <o-table-column
            v-slot="data"
            field="creator"
            label="Creator"
          >
            <o-tooltip :label="data.row.json.creator">
              {{ compactString(data.row.json.creator.split('1')[1]) }}
            </o-tooltip>
          </o-table-column>

          <o-table-column
            v-slot="data"
            field="ipfsLink"
            label=""
          >
            <button-ipfs-link
              :cid="data.row.json.payload.proposalCID"
              size="small"
            />
          </o-table-column>

          <template #detail="data">
            <dl>
              <dt>Proposal ID:</dt>
              <dd><code>{{ data.row.json.payload.proposalId }}</code></dd>
              <dt>Proposal Hash:</dt>
              <dd><code>{{ data.row.json.payload.proposalHash }}</code></dd>
              <dt>Proposal CID:</dt>
              <dd><code>{{ data.row.json.payload.proposalCID }}</code></dd>
              <dt>Creator stake address:</dt>
              <dd><code>{{ data.row.json.creator }}</code></dd>
              <dt>Fund Hash:</dt>
              <dd><code>{{ data.row.json.payload.fundHash }}</code></dd>
              <dt>Challenge ID:</dt>
              <dd><code>{{ data.row.json.payload.challengeId }}</code></dd>
              <dt>Tx Hash:</dt>
              <dd><code>{{ data.row.tx.hash.slice(2) }}</code></dd>
            </dl>
            Raw:
            <textarea
              class="textarea mb-2"
              readonly
              rows="24"
              wrap="off"
              :style="{fontFamily: 'monospace'}"
            >{{ JSON.stringify(data.row, null, 2) }}</textarea>
            <buttons-save
              :source="data.row"
              :file-name="`On-Chain Proposal ${data.row.json.payload.proposalId}.json`"
            />
          </template>
        </o-table>
      </div>

      <div
        v-else
        class="has-text-centered mt-6"
      >
        <o-icon
          icon="circle-xmark"
          variant="primary"
          size="large"
        />
        <br>
        <span class="has-text-primary">
          No proposals found for given fund{{ hashes.length > 1 ? 's' : '' }}
        </span>
      </div>
    </template>
  </template>
</template>

<script setup>
import { computed } from "vue";

import { proposalsOnChainQuery } from "@/blockchain/queries";
import ButtonIpfsLink from "@/components/common/ButtonIpfsLink.vue";
import { useFunds } from "@/composables";
import { compactString } from "@/utils";

const props = defineProps({
  fundHashes: {
    type: Array,
    required: true,
  },
});

const { mapHashTitle, mapChallengeTitles } = useFunds();

const hashes = computed(() => props.fundHashes);

const { isLoading, isError, data: proposals } = proposalsOnChainQuery(hashes);
</script>
