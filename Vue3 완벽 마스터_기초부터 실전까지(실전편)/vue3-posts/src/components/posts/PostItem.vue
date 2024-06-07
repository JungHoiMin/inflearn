<script setup>
import { defineProps, defineEmits } from 'vue';
import AppCard from '@/components/AppCard.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: [String, Date, Number],
    required: true,
  },
});
defineEmits(['modal']);
</script>

<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">{{ content }}</p>
    <p class="text-muted">{{ createdAt }}</p>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-0" @click.stop="$emit('modal')">
          <i class="bi bi-emoji-sunglasses"></i>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<style scoped></style>
