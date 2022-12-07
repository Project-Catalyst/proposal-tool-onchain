<template>
  <div>
    <o-select
      v-model="funds.selectedFundHash"
      :size="props.size"
    >
      <option value="unselected">
        -- Unselected --
      </option>

      <option
        v-for="{fundHash, fundGenesis} in funds.selectable.value"
        :key="fundHash"
        :value="fundHash"
      >
        {{ fundGenesis.title }}
      </option>
    </o-select>
  </div>
</template>

<script setup>
import { useFunds } from "@/composables";

const props = defineProps({
  size: {
    type: String,
    default: "is-normal",
  },
});

const funds = useFunds();
</script>
