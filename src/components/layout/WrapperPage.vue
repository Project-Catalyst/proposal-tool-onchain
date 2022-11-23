<template>
  <div class="page container">
    <h1
      v-if="props.title"
      class="title"
    >
      {{ props.title }}
    </h1>

    <h2
      v-if="props.subtitle"
      class="subtitle"
    >
      {{ props.subtitle }}
    </h2>

    <div class="section">
      <div
        v-if="props.isLoading"
        class="page-loading"
      >
        <icon-loading />
      </div>

      <slot
        v-else-if="props.isEmpty"
        name="empty"
      />

      <slot v-else />
    </div>
  </div>
</template>

<script setup>
import { useTitle } from "@vueuse/core";
import compact from  "lodash/compact";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isEmpty: {
    type: Boolean,
    default: false,
  },
});

useTitle(compact(["Project Catalyst Proposal Tool", props.title]).join(" - "));
</script>

<style lang="scss">
.page {
  & > h1:first-child {
    margin-top: 3rem;

    &, & + h2 {
      padding: 0 1.5rem;
    }

    & + .section,
    & + h2 + .section {
      padding-top: 0;
    }

    @media screen and (min-width: 1024px) {
      &, & + h2 {
        padding: 0 3rem;
      }
    }
  }

  .page-loading {
    display: flex;
    justify-content: center;
  }
}
</style>
