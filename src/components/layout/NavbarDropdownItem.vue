<template>
  <o-dropdown-item
    tag="router-link"
    :to="props.to"
    aria-role="listitem"
    :class="{'is-active-route': isActive}"
  >
    <slot />
  </o-dropdown-item>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  to: {
    type: Object,
    required: true,
  },
});

const isActive = computed(() => route.name === props.to.name);
</script>
