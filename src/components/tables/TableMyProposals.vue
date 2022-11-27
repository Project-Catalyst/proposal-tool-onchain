<template>
  <o-table :data="all">
    <o-table-column
      v-slot="data"
      field="proposalTitle"
      label="Proposal title"
    >
      {{ data.row['Proposal title'] }}
    </o-table-column>

    <o-table-column
      v-slot="data"
      field="challengeTitle"
      label="Challenge title"
    >
      {{ mapChallengeTitles[data.row.fundHash][data.row.challengeId] }}
    </o-table-column>

    <o-table-column
      v-slot="data"
      field="createdAt"
      label="Created at"
    >
      {{ data.row['Creation date'] }}
    </o-table-column>

    <o-table-column
      v-slot="data"
      field="editProposal"
      label=""
    >
      <button-proposal-edit
        size="small"
        :proposal-id="data.row.id"
      />
    </o-table-column>
  </o-table>
</template>

<script setup>
import { useFunds, useProposals } from "@/composables";

import ButtonProposalEdit from "../controls/ButtonProposalEdit.vue";

const { all } = useProposals();

const { mapChallengeTitles } = useFunds();
</script>
