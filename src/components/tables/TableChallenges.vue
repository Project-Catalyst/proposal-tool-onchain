<template>
  <div class="is-relative">
    <o-loading
      v-if="props.checkLoading"
      v-model:active="isLoading"
      :full-page="false"
    >
      <icon-loading />
    </o-loading>

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
        <router-link :to="{name: 'challenges:challengeDetails', params: {id: data.row.id}}">
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
    </o-table>
  </div>
</template>

<script setup>
import { useChallenges } from "@/composables";
import { numberVerbose } from "@/utils";

const props = defineProps({
  checkLoading: {
    type: Boolean,
    default: false,
  },
});

const { all, isLoading } = useChallenges();
</script>
