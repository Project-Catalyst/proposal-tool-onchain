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
          fundHash: props.fundHashParam,
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
      position="right"
      label=""
    >
      <button-proposal-create
        size="small"
        :fund-hash-param="props.fundHashParam"
        :challenge-id="data.row.id.toString()"
      />
    </o-table-column>
  </o-table>
</template>

<script setup>
import ButtonProposalCreate from "@/components/controls/ButtonProposalCreate.vue";
import { useChallenges } from "@/composables";
import { numberVerbose } from "@/utils";

const props = defineProps({
  fundHashParam: {
    type: String,
    required: true,
  },
});

const { all } = useChallenges(props.fundHashParam);
</script>
