<template>
  <Toolbar>
    <template #start>
      <div class="flex md:hidden">
        <a href="/" class="p-2">
          <i class="pi pi-home text-primary"></i>
        </a>
      </div>

      <div class="hidden md:block">
        <Breadcrumb :home="home" :model="breadcrumbItems">
          <template #item="{ item, props }">
            <NuxtLink
              v-if="item.route"
              v-slot="{ href, navigate }"
              :to="item.route"
              custom
            >
              <a :href="href" v-bind="props.action" @click="navigate">
                <span :class="[item.icon, 'text-color']" />
                <span>{{ item.label }}</span>
              </a>
            </NuxtLink>
            <a
              v-else
              :href="item.url"
              :target="item.target"
              v-bind="props.action"
            >
              <span class="text-surface-700 dark:text-surface-0">{{
                item.label
              }}</span>
            </a>
          </template>
        </Breadcrumb>
      </div>
    </template>

    <template #center>
      <div class="relative w-full" ref="searchContainer">
        <IconField class="w-full">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText
            v-model="searchQuery"
            :placeholder="$t('search_placeholder')"
            class="w-full"
            @focus="handleSearchFocus"
          />
        </IconField>

        <div
          v-show="showDataView"
          class="absolute z-50 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-96 overflow-y-auto"
        >
          <DataView :value="searchResults" layout="list" dataKey="id">
            <template #list="{ items }">
              <div class="grid">
                <div
                  v-for="(item, index) in items"
                  :key="item.id || index"
                  class="col-12 cursor-pointer hover:bg-gray-100"
                  @click="selectItem(item)"
                >
                  <div class="flex p-3 border-bottom-1 border-gray-200">
                    <div v-if="item.anh" class="mr-3">
                      <img
                        :src="getFirstImage(item.anh)"
                        :alt="item.tieu_de"
                        class="w-16 h-16 object-cover rounded"
                      />
                    </div>
                    <div>
                      <h5 class="mb-1 font-semibold">{{ item.tieu_de }}</h5>
                      <p class="text-gray-600 line-clamp-2">
                        {{ item.mo_ta }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template #empty>
              <div class="p-4 text-center text-gray-500">
                {{ $t('search_placeholder1') }}
              </div>
            </template>
          </DataView>
        </div>
      </div>
    </template>
  </Toolbar>

  <div class="flex justify-end mb-4">
    <Button
      v-for="locale in locales"
      :key="locale.code"
      class="p-button-text"
      severity="secondary"
      @click="setLocale(locale.code)"
    >
      {{ locale.name }}
    </Button>
  </div>

  <div
    class="card mx-auto min-h-[calc(100vh-94px)] lg:px-[8rem] xl:px-[28rem] 2xl:px-[32rem] 3xl:px-[32rem]"
  >
    <div class="flex flex-col gap-5">
      <div
        v-for="baiviet in listBaiViet"
        :key="baiviet.id"
        class="flex flex-col md:flex-row md:px-12 gap-2 border-b border-gray-200 py-8"
      >
        <div class="w-full md:w-[80%]">
          <h2
            class="text-xl font-bold mb-3"
            :class="{ 'cursor-pointer text-primary': isNavigable(baiviet) }"
            @click="navigateToArticle(baiviet)"
          >
            {{
              baiviet.baiviet_ngonngu?.find((t) => t.ngon_ngu === locale)
                ?.tieu_de
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
        <div
          class="relative w-full md:w-[300px] h-[200px] md:h-[300px] md:mt-0"
        >
          <img
            :class="{ 'cursor-pointer': isNavigable(baiviet) }"
            @click="navigateToArticle(baiviet)"
            :src="getFirstImage(baiviet.anh)"
            alt="Hình ảnh bài viết"
            class="w-full h-full object-cover rounded-lg"
          />
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaiVietModel } from '~/models/bai-viet.model';
import type { ThuMucModel } from '~/models/thu-muc.model';
import { BaiVietService } from '~/services/bai-viet.service';
import { ThuMucService } from '~/services/thu-muc.service';
import { ref, computed, onMounted, watch } from 'vue';

definePageMeta({
  layout: 'main',
  auth: false,
});

const route = useRoute();
const id = route.params.id as string;

const { locale, locales, setLocale, t } = useI18n();
const listBaiViet = ref<BaiVietModel[]>([]);
const thuMuc = ref<ThuMucModel>();
const searchQuery = ref('');
const showDataView = ref(false);
const searchResults = ref<BaiVietModel[]>([]);
const searchContainer = ref<HTMLElement | null>(null);

const home = ref({
  icon: 'pi pi-home',
  route: '/',
});

const { data: thuMucList } = useNuxtData<ThuMucModel[]>('thuMucList');

onMounted(async () => {
  try {
    listBaiViet.value = await BaiVietService.GetBaiViet(id);

    document.addEventListener('click', handleClickOutside);
  } catch (error) {
    console.error('Error loading articles:', error);
  }

  try {
    if (thuMucList.value) return;
    const response = await ThuMucService.GetThuMucPublic();
    thuMucList.value = response;
    useNuxtData<ThuMucModel[]>('thuMucList').data.value = response;
  } catch (error) {
    console.error('Error fetching thu muc:', error);
  }
});

// Clean up event listeners
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const breadcrumbItems = computed(() => {
  const firstArticle =
    Array.isArray(listBaiViet.value) && listBaiViet.value.length > 0
      ? listBaiViet.value[0]
      : undefined;
  if (!firstArticle) return [];
  const thuMucItem = thuMucList.value?.find(
    (t) => t.id === firstArticle.thumucId
  );
  return [
    {
      label:
        thuMucItem?.thumuc_ngonngu?.find((t) => t.ngon_ngu === locale.value)
          ?.ten_thumuc || '',
      route: thuMucItem ? `/${thuMucItem.duong_dan}` : '',
    },
  ];
});

// Utility functions
function getFirstImage(imageData: string | null | undefined): string {
  if (!imageData) return '';
  try {
    return JSON.parse(imageData)[0] || '';
  } catch {
    return '';
  }
}

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

// Search functionality
async function searchArticles(): Promise<void> {
  if (searchQuery.value.length <= 2) {
    searchResults.value = [];
    return;
  }

  try {
    searchResults.value = await BaiVietService.SearchBaiViet(searchQuery.value);
  } catch (error) {
    console.error('Error searching articles:', error);
    searchResults.value = [];
  }
}

function handleSearchFocus(): void {
  showDataView.value = true;
  if (searchQuery.value.length > 2) {
    searchArticles();
  }
}

function selectItem(item: BaiVietModel): void {
  navigateTo(`/${item.thumuc?.duong_dan}/${item.duong_dan}`);
  showDataView.value = false;
}

function handleClickOutside(event: MouseEvent): void {
  if (
    searchContainer.value &&
    !searchContainer.value.contains(event.target as Node)
  ) {
    showDataView.value = false;
  }
}

// Watch for changes in search query with debounce
const debouncedSearch = useDebounceFn(searchArticles, 300);
watch(searchQuery, () => {
  debouncedSearch();
  if (searchQuery.value.length > 2) {
    showDataView.value = true;
  }
});
</script>

<style scoped></style>
