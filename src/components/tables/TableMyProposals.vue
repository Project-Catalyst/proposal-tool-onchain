<template>
  <o-table :data="proposals">
    <o-table-column
      v-slot="data"
      field="title"
      label="Proposal title"
    >
      {{ data.row.title }}
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
      field="updatedAt"
      label="Modified"
    >
      {{ data.row.updatedAt }}
    </o-table-column>

    <o-table-column
      v-slot="data"
      field="status"
      label="Status"
    >
      {{ proposalsWithdrawnIds.includes(data.row.id)
        ? 'Withdrawn' : proposalsPublishedIds.includes(data.row.id)
          ? 'Published' : 'Not published'
      }}
    </o-table-column>

    <o-table-column
      v-slot="data"
      position="right"
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
import ButtonProposalEdit from "@/components/controls/ButtonProposalEdit.vue";
import { useFunds, useProposals, useProposalsPublished, useProposalsWithdrawn } from "@/composables";

const { mapChallengeTitles } = useFunds();
const { all: proposals } = useProposals();
const { ids: proposalsPublishedIds } = useProposalsPublished();
const { ids: proposalsWithdrawnIds } = useProposalsWithdrawn();
</script>
