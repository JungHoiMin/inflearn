<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheView from '@/layouts/TheView.vue';
import { useAlert } from '@/composables/useAlert.js';

const { alerts } = useAlert();
</script>

<template>
  <TheHeader />
  <TheView />
  <AppAlert :items="alerts" />
</template>

<style scoped></style>
