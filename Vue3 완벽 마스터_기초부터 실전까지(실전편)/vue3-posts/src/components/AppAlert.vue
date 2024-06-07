<script setup>
defineProps({
  items: Array,
});

const typeStyle = type => (type === 'error' ? 'alert-danger' : 'alert-primary');
</script>

<template>
  <div class="app-alert">
    <TransitionGroup name="slide">
      <div
        v-for="({ message, type }, idx) in items"
        :key="idx"
        class="alert"
        :class="typeStyle(type)"
        role="alert"
      >
        {{ message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.app-alert {
  position: fixed;
  top: 10px;
  right: 10px;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
