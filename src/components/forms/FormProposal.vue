<template>
  <div class="block">
    <o-field
      v-for="item in schema"
      :key="item.label"
      :label="stringOrArray(item.label)"
    >
      <o-checkbox
        v-if="item.type === 'Boolean'"
        v-model="formData[item.label]"
      />
      <o-input
        v-else
        v-model="formData[item.label]"
      />
    </o-field>
  </div>

  <div class="block">
    <o-button @click="submit">
      Submit
    </o-button>
  </div>
</template>

<script setup>
import isEmpty from "lodash/isEmpty";
import { computed, onMounted, reactive, watch } from "vue";

import { useChallenges } from "@/composables";
import { stringOrArray } from "@/utils";

const props = defineProps({
  challengeId: {
    type: String,
    required: true,
  },
  proposalId: {
    type: String,
    default: "",
  },
});

const emit = defineEmits({
  submit: (formData) => !!formData,
});

const { getById } = useChallenges();

const challenge = getById(props.challengeId);

const schema = computed(() => challenge.value.proposalSchema);

const formData = reactive({});

watch(schema, () => {
  if (schema.value && isEmpty(formData)) {
    schema.value.forEach((item) => {
      formData[item.label] = item.type === "String" ? "" : item.type === "Number" ? null : false;
    });
  }
}, { immediate: true });

function submit() {
  console.log(formData);
  emit("submit", formData);
}

onMounted(() => {
  console.log({ challenge: challenge });
});
</script>
