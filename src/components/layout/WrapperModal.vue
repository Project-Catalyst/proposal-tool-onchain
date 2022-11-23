<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ props.title }}
      </p>

      <o-icon
        clickable
        native-type="button"
        icon="times"
        @click="emit('close')"
      />
    </header>

    <section
      :class="{
        'modal-card-body': true,
        'has-text-centered': props.isContentCentered
      }"
    >
      <slot />
    </section>

    <footer class="modal-card-foot">
      <o-button
        variant="primary"
        @click="emit('close')"
      >
        OK
      </o-button>
    </footer>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isContentCentered: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits({
  close: () => true,
});
</script>
