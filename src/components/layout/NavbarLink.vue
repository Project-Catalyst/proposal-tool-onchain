<template>
  <router-link
    :to="props.to"
    :class="{
      'navbar-item': true,
      'is-active': isActive,
    }"
  >
    <slot />
  </router-link>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  to: {
    type: Object,
    required: true,
  },
});

const route = useRoute();

const isActive = computed(() => props.to.name === route.name);
</script>
