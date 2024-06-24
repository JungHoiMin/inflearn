<script setup>
import { useCounterStore } from '@/stores/counter.js';
import { storeToRefs } from 'pinia';

const store = useCounterStore();
const { counter, doubleCountPlusOne, doubleCount } = storeToRefs(store);
const { increment } = store;
counter.value = 100;
</script>

<template>
  <div>
    <h2>About View</h2>
    <p>{{ $route.path }}</p>
    <p>{{ $route.name }}</p>
    <button class="btn btn-primary" @click="$router.push('/')">
      Home으로 이동
    </button>
    <h2>Store</h2>
    <p>counter: {{ counter }}</p>
    <p>doubleCounter: {{ doubleCount }}</p>
    <p>doubleCounterPlusOne: {{ doubleCountPlusOne }}</p>
    <button @click="increment">Click!!</button>
  </div>
</template>

<style scoped></style>
