<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { createPost } from '@/api/posts.js';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/useAlert.js';
import { useAxios } from '@/composables/useAxios.js';

const router = useRouter();
const { vSuccess, vAlert } = useAlert();
const form = ref({
  title: null,
  content: null,
});

const { error, loading, execute } = useAxios(
  '/posts',
  {
    method: 'post',
  },
  {
    immediate: false,
    onSuccess: async () => {
      vSuccess('등록이 완료되었습니다.');
      await router.push({ name: 'PostList' });
    },
    onError: err => {
      vAlert(err.message);
    },
  },
);
const save = async () => {
  execute({ ...form.value, createdAt: Date.now() });
};
// const save = async () => {
//   try {
//     loading.value = true;
//     const data = { ...form.value, createdAt: Date.now() };
//     await createPost(data);
//     vSuccess('등록이 완료되었습니다.');
//     await router.push({ name: 'PostList' });
//   } catch (err) {
//     error.value = err;
//   } finally {
//     loading.value = false;
//   }
// };
const goListPage = () => router.push({ name: 'PostList' });
const visibleForm = ref(true);
</script>

<template>
  <div>
    <h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error.message" />
    <PostForm
      v-if="visibleForm"
      v-model:title="form.title"
      v-model:content="form.content"
      @submit.prevent="save"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-dark me-2"
          @click="goListPage"
        >
          목록
        </button>
        <button class="btn btn-primary" type="submit" :disabled="loading">
          <template v-if="loading">
            <span
              class="spinner-grow spinner-grow-sm"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden" role="status">Loading...</span>
          </template>
          <template v-else> 저장 </template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<style scoped></style>
