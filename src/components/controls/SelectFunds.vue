<template>
  <o-field label="Select fund(s)">
    <o-inputitems
      v-model="fundsSelected"
      autocomplete
      open-on-focus
      field="title"
      icon="tag"
      :data="fundsFiltered"
      placeholder="Search..."
      aria-close-label="Delete this item"
      @typing="getFilteredFunds"
    />
  </o-field>
</template>

<script setup>
import { computed, ref, watch } from "vue";

import { useFunds } from "@/composables";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits({
  "update:modelValue": (value) => Array.isArray(value),
});

const { mapHashTitle: funds } = useFunds();

const fundsAll = computed(() => Object.entries(funds.value).map(([hash, title]) => ({ hash, title })));

const fundsFiltered = ref(fundsAll.value);

function getFilteredFunds(text) {
  fundsFiltered.value = fundsAll.value.filter((option) => {
    return (
      option.title
        .toLowerCase()
        .indexOf(text.toLowerCase()) >= 0
    );
  });
}

const fundsSelected = ref(props.modelValue);

watch(fundsSelected, () => emit("update:modelValue", fundsSelected.value));
</script>
