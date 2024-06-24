<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { useAxios } from '@/composables/useAxios.js';

const router = useRouter();

const previewId = ref(null);
const selectPreview = id => {
  previewId.value = id;
};

const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _page: 1,
  _limit: 6,
  title_like: '',
});
const {
  response,
  data: posts,
  loading,
  error,
} = useAxios('/posts', { method: 'get', params });
const isExist = computed(() => posts.value && posts.value.length > 0);
// pagination
const totalCount = computed(() => +response.value.headers['x-total-count']);
const pageCount = computed(() =>
  Math.ceil(totalCount.value / params.value._limit),
);

const goPage = id => {
  router.push({
    name: 'PostDetail',
    params: {
      id,
    },
  });
};

// modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');
const openModal = ({ title, content, createdAt }) => {
  show.value = true;
  modalTitle.value = title;
  modalContent.value = content;
  modalCreatedAt.value = createdAt;
};

const changeLimit = value => {
  params.value._limit = value;
  params.value._page = 1;
};
</script>

<template>
  <div>
    <h2>게시글 목록</h2>
    <hr class="my-4" />
    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
      @update:limit="changeLimit"
    />
    <hr class="my-4" />

    <AppLoading v-if="loading" />

    <AppError v-else-if="error" :message="error.message" />

    <template v-else-if="!isExist">
      <p class="text-center py-5 text-muted">No Results</p>
    </template>

    <template v-else>
      <AppGrid :items="posts" col-class="col-12 col-md-6 col-lg-4">
        <template v-slot="{ item: post }">
          <PostItem
            :title="post.title"
            :content="post.content"
            :created-at="post.createdAt"
            @click="goPage(post.id)"
            @modal="openModal(post)"
            @preview="selectPreview(post.id)"
          />
        </template>
      </AppGrid>
      <AppPagination
        :current-page="params.page"
        :page-count="pageCount"
        @page="page => (params._page = page)"
      />
    </template>
    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :content="modalContent"
        :createdAt="modalCreatedAt"
      />
    </Teleport>

    <template v-if="previewId">
      <hr class="my-5" />
      <AppCard>
        <PostDetailView :id="previewId" />
      </AppCard>
    </template>
  </div>
</template>

<style scoped></style>
