<script setup>
import { defineProps, defineEmits, inject, computed } from 'vue';

const props = defineProps({
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
defineEmits(['modal', 'preview']);
const dayjs = inject('dayjs');
const createdDate = computed(() =>
  dayjs(props.createdAt).format('YYYY. MM. DD HH:mm:ss'),
);
</script>

<template>
  <AppCard>
    <h5 class="card-title text-truncate">{{ title }}</h5>
    <p class="card-text text-truncate">{{ content }}</p>
    <p class="text-muted">{{ createdDate }}</p>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-1" @click.stop="$emit('modal')">
          <i class="bi bi-emoji-sunglasses"></i>
        </button>
        <button class="btn p-1" @click.stop="$emit('preview')">
          <i class="bi bi-app"></i>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<style scoped></style>
