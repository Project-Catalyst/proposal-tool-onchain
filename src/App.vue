<template>
  <app-navbar />
  <router-view :key="route.fullPath" />
</template>

<script setup>
import { useRoute } from "vue-router";

import AppNavbar from "@/components/layout/AppNavbar.vue";
import { useTxConfirmation } from "@/composables";

const route = useRoute();

useTxConfirmation();
</script>
