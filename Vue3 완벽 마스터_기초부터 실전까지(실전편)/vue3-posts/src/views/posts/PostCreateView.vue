<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { createPost } from '@/api/posts.js';
import PostForm from '@/components/posts/PostForm.vue';

const router = useRouter();
const form = ref({
  title: null,
  content: null,
});
const save = async () => {
  try {
    const data = { ...form.value, createdAt: Date.now() };
    await createPost(data);
    await router.push({ name: 'PostList' });
  } catch (error) {
    console.error('error: ', error);
  }
};
const goListPage = () => router.push({ name: 'PostList' });
</script>

<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <PostForm
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
        <button type="submit" class="btn btn-primary">저장</button>
      </template>
    </PostForm>
  </div>
</template>

<style scoped></style>
