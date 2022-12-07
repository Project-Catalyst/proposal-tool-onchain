<template>
  <div
    :class="{
      'navbar-item': true,
      'is-active': isActiveRoute
    }"
  >
    <span><slot /></span>

    <o-icon :icon="props.isActive ? 'angle-up' : 'angle-down'" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
  pagesNamePrefix: {
    type: String,
    default: null,
  },
});

const route = useRoute();

const isActiveRoute = computed(() => route.name?.startsWith(props.pagesNamePrefix));
</script>
