<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { ref } from 'vue';
import { getPosts } from '@/api/posts.js';
import { useRouter } from 'vue-router';
import PostDetailView from '@/views/posts/PostDetailView.vue'
import AppCard from '@/components/AppCard.vue'

const router = useRouter();

const posts = ref([]);

const fetchPosts = async () => {
  posts.value = await getPosts();
};
fetchPosts();

const goPage = id => {
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  });
};
</script>

<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
          :title="post.title"
          :content="post.content"
          :created-at="post.createdAt"
          @click="goPage(post.id)"
        />
      </div>
    </div>
    <hr class="my-4" />
    <AppCard>
      <PostDetailView :id="3" />
    </AppCard>
  </div>
</template>

<style scoped></style>
