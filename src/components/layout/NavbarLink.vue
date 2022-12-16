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
  exact: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

const isActive = computed(() =>
  props.exact ? route.name === props.to.name : route.name?.startsWith(props.to.name.split(":")[0]),
);
</script>
