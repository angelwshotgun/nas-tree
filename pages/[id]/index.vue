<template>
  <div class="flex flex-col gap-5 container1">
    <div
      v-for="(baiviet, index) in paginatedBaiViet"
      :key="baiviet.id"
      class="flex flex-col md:flex-row gap-5 border-b border-gray-200 pb-8 w-full"
    >
      <div 
        class="relative w-full md:w-[300px] h-auto md:mt-0 swipe-container"
        :ref="el => { if (el) swipeContainers[getGlobalIndex(index)] = el as HTMLElement }"
      >
        <Galleria
          v-model:activeIndex="activeIndices[getGlobalIndex(index)]"
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
              :class="{ 'cursor-pointer': isNavigable(baiviet) }"
              @click="navigateToArticle(baiviet)"
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
      <div class="w-full md:w-[80%]">
        <h2
          class="text-xl font-bold mb-3"
          :class="{ 'cursor-pointer text-primary': isNavigable(baiviet) }"
          @click="navigateToArticle(baiviet)"
        >
          {{
            baiviet.baiviet_ngonngu?.find((t) => t.ngon_ngu === locale)?.tieu_de
          }}
        </h2>
        <div
          class="w-full text-gray-700 break-words text-wrap whitespace-pre-line [&_.ql-align-justify]:text-justify [&_.ql-align-center]:text-center [&_.ql-align-right]:text-right"
        >
          {{
            baiviet.baiviet_ngonngu?.find((t) => t.ngon_ngu === locale)?.mo_ta
          }}
        </div>
      </div>
    </div>

    <!-- Paginator -->
    <div class="flex justify-center mt-8" v-if="totalRecords > itemsPerPage">
      <Paginator
        :rows="itemsPerPage"
        :totalRecords="totalRecords"
        :first="first"
        @page="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaiVietModel } from '~/models/bai-viet.model';
import { BaiVietService } from '~/services/bai-viet.service';
import { useSwipe } from '@vueuse/core';
import { onMounted, ref, reactive, nextTick, computed } from 'vue';
import type { PageState } from 'primevue/paginator';

definePageMeta({
  layout: 'main',
  auth: false,
});

const route = useRoute();
const id = route.params.id as string;

const { locale } = useI18n();
const listBaiViet = ref<BaiVietModel[]>([]);
const swipeContainers = reactive<HTMLElement[]>([]);
const activeIndices = ref<number[]>([]);

// Pagination state
const first = ref(0);
const itemsPerPage = ref(5);
const totalRecords = computed(() => listBaiViet.value.length);

// Computed property cho dữ liệu được phân trang
const paginatedBaiViet = computed(() => {
  const start = first.value;
  const end = start + itemsPerPage.value;
  return listBaiViet.value.slice(start, end);
});

// Hàm để lấy index toàn cục từ index trong trang hiện tại
function getGlobalIndex(localIndex: number): number {
  return first.value + localIndex;
}

await BaiVietService.GetBaiVietList(id).then((res) => {
  listBaiViet.value = Array.isArray(res) ? res : res ? [res] : [];
  // Khởi tạo mảng activeIndices với giá trị 0 cho mỗi bài viết
  activeIndices.value = Array(listBaiViet.value.length).fill(0);
});

function isNavigable(article: BaiVietModel): boolean {
  return article.noi_dung !== '';
}

function isGoogleMapsLink(url: string | null | undefined): boolean {
  return !!url && url.includes('maps.app.goo.gl');
}

function navigateToArticle(article: BaiVietModel): void {
  if (
    isNavigable(article) &&
    Array.isArray(article.baiviet_ngonngu) &&
    article.baiviet_ngonngu.length > 0 &&
    article.baiviet_ngonngu[0].duong_dan
  ) {
    navigateTo(`/${id}/${article.baiviet_ngonngu[0].duong_dan}`);
  }
}

// Hàm xử lý khi thay đổi trang
function onPageChange(event: PageState) {
  first.value = event.first;
  itemsPerPage.value = event.rows;
  
  // Scroll lên đầu trang khi chuyển trang
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Cập nhật lại swipe containers cho trang mới
  nextTick(() => {
    setupSwipeContainers();
  });
}

// Hàm để xử lý việc chuyển ảnh
function handleSwipe(globalIndex: number, direction: string) {
  const images = JSON.parse(listBaiViet.value[globalIndex]?.anh ?? '[]');
  if (!images || images.length <= 1) return;

  if (direction === 'left') {
    // Chuyển đến ảnh tiếp theo
    activeIndices.value[globalIndex] = (activeIndices.value[globalIndex] + 1) % images.length;
  } else if (direction === 'right') {
    // Chuyển đến ảnh trước đó
    activeIndices.value[globalIndex] = (activeIndices.value[globalIndex] - 1 + images.length) % images.length;
  }
}

// Hàm setup swipe containers
function setupSwipeContainers() {
  swipeContainers.forEach((container, globalIndex) => {
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
            handleSwipe(globalIndex, direction);
          }
        },
      });
    }
  });
}

onMounted(() => {
  nextTick(() => {
    setupSwipeContainers();
  });
});
</script>

<style scoped>
.p-galleria {
  width: 100%;
  height: 100%;
}

.swipe-container {
  touch-action: pan-y;
}

/* Custom styles cho Paginator */
:deep(.p-paginator) {
  background: transparent;
  border: none;
  padding: 1rem 0;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page) {
  margin: 0 0.125rem;
  border-radius: 50%;
  min-width: 2.5rem;
  height: 2.5rem;
}

:deep(.p-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  background: var(--primary-color);
  color: var(--primary-color-text);
}

:deep(.p-dropdown) {
  margin-left: 1rem;
}
</style>