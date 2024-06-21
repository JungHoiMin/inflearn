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
import { reactive, ref, toRef, toRefs } from 'vue'

const router = useRouter();
const goAboutPage = () => {
  router.push({
    name: 'About',
  });
};

const items = ref(['사과', '딸기', '포도', '바나나']);

const position = reactive({
  x: 100,
  y: 1000,
});

// const x = ref(position.x);
// const y = ref(position.y);
// console.log('x: ', typeof x.value);
// console.log('y: ', typeof y.value);

// const x = toRef(position, 'x');
// const y = toRef(position, 'y');
const { x, y } = toRefs(position);
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
    <h2>{{ position }}</h2>
    <h2>x: {{ x }}, y: {{ y }}</h2>
  </div>
</template>

<style scoped></style>
