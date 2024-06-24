<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { computed, toRef, toRefs } from 'vue';
import { useAxios } from '@/composables/useAxios.js';
import { useAlert } from '@/composables/useAlert.js';
import { useNumber } from '@/composables/useNumber.js';

const props = defineProps({
  id: [String, Number],
});

const router = useRouter();
// const idRef = toRef(props, 'id');
const { id: idRef } = toRefs(props);
const { isOdd, isEven } = useNumber(idRef);
const { vAlert, vSuccess } = useAlert();
const url = computed(() => `/posts/${props.id}`);
const { data: post, loading, error } = useAxios(url);

const {
  loading: removeLoading,
  error: removeError,
  execute,
} = useAxios(
  `/posts/${props.id}`,
  { method: 'delete' },
  {
    immediate: false,
    onSuccess: async () => {
      vSuccess('삭제가 완료되었습니다.');
      await router.push({ name: 'PostList' });
    },
    onError: err => {
      vAlert(err.message);
    },
  },
);

const remove = async () => {
  if (confirm('삭제 하시겠습니까?') === false) return;
  execute();
};

const goListPage = () => router.push({ name: 'PostList' });
const goEditPage = () =>
  router.push({ name: 'PostEdit', params: { id: props.id } });

onBeforeRouteUpdate(() => {
  console.log('onBeforeRouteUpdate');
});
onBeforeRouteLeave(() => {
  console.log('onBeforeRouteLeave');
});
</script>
<script>
export default {
  beforeRouteEnter() {
    console.log('beforeRouteEnter');
  },
};
</script>
<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>id: {{ props.id }}, isOdd: {{ isOdd }}</p>
    <p>{{ post.content }}</p>
    <p class="text-muted">
      <!--      {{ $dayjs(post.createdAt).format('YYYY. MM. DD HH:mm:ss') }}-->
    </p>
    <hr class="my-4 g-2" />
    <AppError v-if="removeError" :message="removeError.message" />
    <div class="row">
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="$router.push('/posts/10')">
          이전글
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="goListPage">목록</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="goEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button
          class="btn btn-outline-danger"
          type="submit"
          :disabled="removeLoading"
          @click="remove"
        >
          <template v-if="removeLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else> 삭제 </template>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
