<template>
  <o-table :data="all">
    <o-table-column
      v-slot="data"
      field="id"
      label="ID"
    >
      {{ data.row.id }}
    </o-table-column>

    <o-table-column
      v-slot="data"
      field="title"
      label="Title"
    >
      <router-link
        :to="{ name: 'challenges:challengeDetails', params: {
          fundHash: props.fundHash,
          challengeId: data.row.id,
        }}"
      >
        {{ data.row.title }}
      </router-link>
    </o-table-column>

    <o-table-column
      v-slot="data"
      field="fundsAvailable"
      label="Funds"
    >
      {{ numberVerbose(data.row.fundsAvailable) }}
    </o-table-column>

    <o-table-column
      v-slot="data"
      field="fundsCurrency"
      label="Currency"
    >
      {{ data.row.fundsCurrency }}
    </o-table-column>

    <o-table-column
      v-slot="data"
      field="addProposal"
      label=""
    >
      <button-proposal
        size="small"
        :challenge-id="data.row.id.toString()"
      />
    </o-table-column>
  </o-table>
</template>

<script setup>
import ButtonProposal from "@/components/controls/ButtonProposal.vue";
import { useChallenges } from "@/composables";
import { numberVerbose } from "@/utils";

const props = defineProps({
  fundHash: {
    type: String,
    required: true,
  },
});

const { all } = useChallenges(props.fundHash);
</script>
