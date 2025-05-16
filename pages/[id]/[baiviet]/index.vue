<template>
  <div class="article-detail-container">
    <!-- Thanh công cụ với breadcrumb và tìm kiếm -->
    <Toolbar class="mb-4">
      <template #start>
        <!-- Only show home icon on small screens -->
        <div class="flex md:hidden">
          <a href="/" class="p-2">
            <i class="pi pi-home text-primary"></i>
          </a>
        </div>

        <!-- Full breadcrumb only on medium screens and up -->
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
              @click="showDataView = true"
              @focus="showDataView = true"
            />
          </IconField>

          <!-- DataView dropdown -->
          <div
            v-show="showDataView"
            class="absolute z-50 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-96 overflow-y-auto"
          >
            <DataView :value="searchResults" layout="list" dataKey="id">
              <template #list="slotProps">
                <div class="grid">
                  <div
                    v-for="(item, index) in slotProps.items"
                    :key="index"
                    class="col-12 cursor-pointer hover:bg-gray-100"
                    @click="selectItem(item)"
                  >
                    <div class="flex p-3 border-bottom-1 border-gray-200">
                      <div v-if="item.anh" class="mr-3">
                        <img
                          :src="JSON.parse(item.anh)[0]"
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
      <div v-if="baiviet" class="article-content">
        <!-- Tiêu đề bài báo -->
        <h1 class="text-3xl lg:text-4xl font-bold text-primary">
          {{
            baiviet.baiviet_ngonngu?.find((t) => t.ngon_ngu === locale)?.tieu_de
          }}
        </h1>

        <!-- Thông tin bài báo -->
        <div class="flex items-center gap-4 text-gray-600 mb-6">
          <span
            ><i class="pi pi-calendar mr-2"></i
            >{{
              formatDate(
                baiviet.baiviet_ngonngu?.find((t) => t.ngon_ngu === locale)
                  ?.createdAt || ''
              )
            }}</span
          >
          <!-- <span
            ><i class="pi pi-user mr-2"></i
            >{{ baiviet.tac_gia || 'Admin' }}</span
          >
          <span
            ><i class="pi pi-eye mr-2"></i>{{ baiviet.luot_xem || 0 }} lượt
            xem</span
          > -->
        </div>
        <span>{{
          baiviet.baiviet_ngonngu?.find((t) => t.ngon_ngu === locale)?.mo_ta ||
          ''
        }}</span>
        <!-- Nội dung bài báo và hình ảnh -->
        <div class="flex flex-col lg:flex-row gap-8  mt-4">
          <!-- Phần nội dung chính -->
          <div class="w-full lg:w-full">
            <!-- Ảnh chính cho mobile -->
            <div class="lg:hidden mb-6 relative">
              <img
                v-if="baiviet.anh && JSON.parse(baiviet.anh).length > 0"
                :src="JSON.parse(baiviet.anh)[0]"
                :alt="baiviet.tieu_de"
                class="w-full rounded-lg object-cover h-[300px]"
              />
              <div
                v-if="baiviet.vi_tri"
                class="bg-black absolute -bottom-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-800 transition-colors"
              >
                <a
                  :href="baiviet.vi_tri"
                  target="_blank"
                  class="cursor-pointer"
                >
                  <i class="pi pi-map-marker text-white text-xl"></i>
                </a>
              </div>
            </div>

            <!-- Nội dung bài viết -->
            <div>
              <p>
                {{
                  baiviet.baiviet_ngonngu?.find((t) => t.ngon_ngu === locale)
                    ?.noi_dung
                }}
              </p>
            </div>
            <!-- <div
              class="article-body text-gray-800 leading-relaxed text-lg mb-8 whitespace-pre-line [&_.ql-align-justify]:text-justify [&_.ql-align-center]:text-center [&_.ql-align-right]:text-right"
              v-html="baiviet.noi_dung"
            ></div> -->

            <!-- Tags hoặc chủ đề liên quan -->
            <!-- <div v-if="baiviet.chu_de" class="flex flex-wrap gap-2 mt-6">
              <Tag
                v-for="(chuDe, index) in getChuDe(baiviet.chu_de)"
                :key="index"
                :value="chuDe"
                class="bg-primary-100 text-primary-900"
              />
            </div> -->
          </div>

          <!-- Sidebar với ảnh và thông tin bổ sung -->
          <!-- <div class="w-full lg:w-1/3">
            <div class="hidden lg:block relative mb-6">
              <img
                v-if="baiviet.anh && JSON.parse(baiviet.anh).length > 0"
                :src="JSON.parse(baiviet.anh)[0]"
                :alt="baiviet.tieu_de"
                class="w-full rounded-lg object-cover h-[350px]"
              />
              <div
                v-if="baiviet.vi_tri"
                class="absolute -bottom-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary-800 transition-colors"
              >
                <a
                  :href="baiviet.vi_tri"
                  target="_blank"
                  class="cursor-pointer"
                >
                  <i class="pi pi-map-marker text-white text-xl"></i>
                </a>
              </div>
            </div>

            <div
              v-if="baiviet.anh && JSON.parse(baiviet.anh).length > 1"
              class="mt-4 grid grid-cols-2 gap-2"
            >
              <img
                v-for="(anh, index) in JSON.parse(baiviet.anh).slice(1, 5)"
                :key="index"
                :src="anh"
                :alt="`Ảnh ${index + 1}`"
                class="w-full h-[120px] object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              />
            </div>
          </div> -->
        </div>
      </div>

      <!-- Loading state -->
      <div v-else class="flex justify-center items-center h-64">
        <ProgressSpinner />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaiVietModel } from '~/models/bai-viet.model';
import type { ThuMucModel } from '~/models/thu-muc.model';
import { BaiVietService } from '~/services/bai-viet.service';
import { ThuMucService } from '~/services/thu-muc.service';

definePageMeta({
  layout: 'main',
  auth: false,
});

const route = useRoute();
const duongdan = route.params.baiviet;
const { locale, locales, setLocale, t } = useI18n();

// Lấy thông tin bài viết chính
const baiviet = ref<BaiVietModel>();
const relatedArticles = ref<BaiVietModel[]>([]);

const searchQuery = ref('');
const showDataView = ref(false);
const searchResults = ref<BaiVietModel[]>([]);

const { data: thuMucList } = useNuxtData<ThuMucModel[]>('thuMucList');

onMounted(async () => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.relative') && showDataView.value) {
      showDataView.value = false;
    }
  });

  fetchBaiViet();

  try {
    if (thuMucList.value) return;
    const response = await ThuMucService.GetThuMucPublic();
    thuMucList.value = response;
    useNuxtData<ThuMucModel[]>('thuMucList').data.value = response;
  } catch (error) {
    console.error('Error fetching thu muc:', error);
  }
});

const searchArticles = async () => {
  try {
    const response = await BaiVietService.SearchBaiViet(searchQuery.value);
    searchResults.value = response;
  } catch (error) {
    console.error('Lỗi khi tìm kiếm bài viết:', error);
  }
};

const selectItem = (item: BaiVietModel) => {
  navigateTo(`/${item.thumuc?.duong_dan}/${item.duong_dan}`);
  showDataView.value = false;
};

// Watch for changes in search query
watch(searchQuery, (newValue) => {
  if (newValue.length > 2) {
    showDataView.value = true;
    searchArticles();
  } else {
    searchResults.value = [];
  }
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

const home = ref({
  icon: 'pi pi-home',
  route: '/',
});

const breadcrumbItems = computed(() => {
  const thuMucItem = thuMucList.value?.find(
    (t) => t.id === baiviet.value?.thumucId
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

const formatDate = (dateString: string | number | Date) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
</script>

<style scoped>
:deep(.article-body) {
  text-align: justify !important;
  position: relative !important;
}

:deep(.article-body img) {
  display: block !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
</style>
