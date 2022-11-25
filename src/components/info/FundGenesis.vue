<template>
  <buttons-save
    :source="props.genesis"
    :file-name="props.genesis?.title"
  />

  <pre class="block">{{ props.genesis }}</pre>
</template>

<script setup>
const props = defineProps({
  genesis: {
    type: Object,
    required: true,
  },
});
</script>
