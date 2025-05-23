<template>
  <div v-if="baiviet" class="article-content max-w-4xl mx-auto px-4 py-8">
    <header class="mb-8">
      <h1 class="text-3xl lg:text-4xl font-bold text-primary mb-4">
        {{ baiviet.baiviet_ngonngu?.find((t) => t.ngon_ngu === locale)?.tieu_de }}
      </h1>
      <div class="flex items-center gap-4 text-gray-600">
        <span>
          <i class="pi pi-calendar mr-2"></i>
          {{
            formatDate(
              baiviet.baiviet_ngonngu?.find((t) => t.ngon_ngu === locale)
                ?.createdAt || ''
            )
          }}
        </span>
      </div>
    </header>

    <div class="featured-image mb-8">
      <div 
        class="relative w-full h-auto swipe-container"
        :ref="el => { if (el) swipeContainers[0] = el as HTMLElement }"
      >
        <Galleria
          v-model:activeIndex="activeIndices[0]"
          :value="JSON.parse(baiviet?.anh ?? '[]')"
          :numVisible="1"
          :circular="true"
          :showThumbnails="false"
          :autoPlay="true"
          :transitionInterval="10000"
          class="swipe-galleria"
          :showItemNavigators="JSON.parse(baiviet?.anh ?? '[]').length > 1"
        >
          <template #item="slotProps">
            <img
              :src="slotProps.item"
              alt="Hình ảnh bài viết"
              class="w-full h-auto object-cover rounded-lg"
            />
          </template>
        </Galleria>
        <div
          v-if="baiviet.vi_tri"
          class="absolute -bottom-4 -right-4 w-12 h-12 bg-black rounded-full flex items-center justify-center"
        >
          <a :href="baiviet.vi_tri" target="_blank" class="cursor-pointer">
            <i
              :class="[
                isGoogleMapsLink(baiviet.vi_tri)
                  ? 'pi pi-map-marker'
                  : 'pi pi-link',
                'text-white text-xl',
              ]"
            ></i>
          </a>
        </div>
      </div>
    </div>

    <div class="article-summary mb-8 text-lg font-medium text-gray-700">
      {{ baiviet.baiviet_ngonngu?.find((t) => t.ngon_ngu === locale)?.mo_ta }}
    </div>

    <div class="article-body prose prose-lg max-w-none text-gray-700">
      <p>{{ baiviet.baiviet_ngonngu?.find((t) => t.ngon_ngu === locale)?.noi_dung }}</p>
    </div>
  </div>

  <div v-else class="flex justify-center items-center h-64">
    <ProgressSpinner />
  </div>
</template>

<script setup lang="ts">
import type { BaiVietModel } from '~/models/bai-viet.model';
import { BaiVietService } from '~/services/bai-viet.service';

definePageMeta({
  layout: 'main',
  auth: false,
});

const route = useRoute();
const duongdan = route.params.baiviet;
const { locale } = useI18n();
const listBaiViet = ref<BaiVietModel[]>([]);
const swipeContainers = reactive<HTMLElement[]>([]);
const activeIndices = ref<number[]>([]);

const baiviet = ref<BaiVietModel>();

onMounted(() => {
  fetchBaiViet();
  nextTick(() => {
    swipeContainers.forEach((container, index) => {
      if (container) {
        useSwipe(container, {
          onSwipeStart(e) {
            // e.preventDefault();
          },
          onSwipe(e) {
            // e.preventDefault();
          },
          onSwipeEnd(e, direction) {
            if (direction === 'left' || direction === 'right') {
              handleSwipe(index, direction);
            }
          },
        });
      }
    });
  });
});

const fetchBaiViet = async () => {
  try {
    const response = await BaiVietService.GetBaiVietByDuongDan(
      duongdan.toString()
    );
    baiviet.value = response;
  } catch (error) {
    console.error('Lỗi khi lấy bài viết:', error);
  }
};

const formatDate = (dateString: string | number | Date) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

function isGoogleMapsLink(url: string | null | undefined): boolean {
  return !!url && url.includes('maps.app.goo.gl');
}

function handleSwipe(index: number, direction: string) {
  const images = JSON.parse(listBaiViet.value[index]?.anh ?? '[]');
  if (!images || images.length <= 1) return;

  if (direction === 'left') {
    activeIndices.value[index] =
      (activeIndices.value[index] + 1) % images.length;
  } else if (direction === 'right') {
    activeIndices.value[index] =
      (activeIndices.value[index] - 1 + images.length) % images.length;
  }
}
</script>

<style scoped>
.article-body {
  text-align: justify;
  position: relative;
  line-height: 1.8;
}

.article-body img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  height: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.p-galleria {
  width: 100%;
  height: 100%;
}

.swipe-container {
  touch-action: pan-y;
}

@media (min-width: 768px) {
  .article-content {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}
</style>
