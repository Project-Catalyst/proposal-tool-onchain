<template>
  <o-table
    :data="funds.all.value || []"
  >
    <o-table-column
      v-slot="props"
      field="fundHashCompact"
      label="Hash"
    >
      {{ props.row.fundHashCompact }}
    </o-table-column>

    <o-table-column
      v-slot="props"
      field="title"
      label="Title"
    >
      <span
        v-if="funds.selectedFundHash.value === props.row.fundHash"
        class="tag is-success is-light"
      >
        CURRENT
      </span>

      <router-link
        v-if="funds.selectedFundHash.value === props.row.fundHash"
        :to="{name: 'funds:current'}"
      >
        {{ props.row.fundGenesis.title }}
      </router-link>

      <router-link
        v-else
        :to="{name: 'funds:fundDetails', params: {fundHash: props.row.fundHash}}"
      >
        {{ props.row.fundGenesis.title }}
      </router-link>
    </o-table-column>

    <o-table-column
      v-slot="props"
      field="activityPeriodVerbose"
      label="Activity"
    >
      {{ props.row.activityPeriodVerbose }}
    </o-table-column>

    <o-table-column
      v-slot="props"
      field="qaStageVerbose"
      label="QA"
    >
      <span :class="`tag is-light ${props.row.communityQualityAssuranceStage ? 'is-success' : ''}`">
        {{ props.row.qaStageVerbose }}
      </span>
    </o-table-column>

    <o-table-column
      v-slot="props"
      field="currentStages"
      label="Stage(s)"
    >
      <template v-if="props.row.currentStagesVerbose.length">
        <span
          v-for="stage in props.row.currentStagesVerbose"
          :key="stage"
          class="tag is-primary is-light mr-1"
        >{{ stage }}</span>
      </template>

      <template v-else>
        <span class="tag is-white">&ndash;</span>
      </template>
    </o-table-column>
  </o-table>
</template>

<script setup>
import { useFunds } from "@/composables";

const funds = useFunds();
</script>
