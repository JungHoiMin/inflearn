<script>
export default {
  created() {
    // console.log(this.$person.name);
    // this.$person.say();
  },
};
</script>
<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const goAboutPage = () => {
  router.push({
    name: 'About',
  });
};

const items = ref(['사과', '딸기', '포도', '바나나']);
</script>

<template>
  <div>
    <h2>Home View</h2>
    <p>{{ $route.path }}</p>
    <p>{{ $route.name }}</p>
    <button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
    <hr class="my-4" />
    <AppGrid :items="items" v-slot="{ item }" col-class="col-6">
      <AppCard>{{ item }}</AppCard>
    </AppGrid>
    <hr class="my-4" />
  </div>
</template>

<style scoped></style>
