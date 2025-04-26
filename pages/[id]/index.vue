<template>
  <Toolbar>
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
            placeholder="Tìm kiếm"
            class="w-full"
            @click="showDataView = true"
            @focus="showDataView = true"
          />
        </IconField>

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
                Nhập từ khóa để tìm kiếm
              </div>
            </template>
          </DataView>
        </div>
      </div>
    </template>
  </Toolbar>
  <div
    class="card mx-auto min-h-[calc(100vh-94px)] lg:px-[8rem] xl:px-[28rem] 2xl:px-[32rem] 3xl:px-[32rem]"
  >
    <div class="flex flex-col gap-5">
      <template v-for="baiviet in listBaiViet" :key="baiviet.id">
        <div
          class="flex flex-col md:flex-row md:px-12 gap-2 border-b border-gray-200 py-8"
        >
          <div class="w-full md:w-[80%]">
            <h2
              class="text-xl font-bold mb-3"
              :class="{
                'cursor-pointer text-primary': baiviet.noi_dung !== '<p> </p>',
              }"
              @click="
                baiviet.noi_dung !== '<p> </p>' &&
                  navigateTo(`/${id}/${baiviet.duong_dan}`)
              "
            >
              {{ baiviet.tieu_de }}
            </h2>
            <div
              class="w-full text-gray-700 break-words text-wrap whitespace-pre-line [&_.ql-align-justify]:text-justify [&_.ql-align-center]:text-center [&_.ql-align-right]:text-right"
            >
              {{ baiviet.mo_ta }}
            </div>
          </div>
          <div
            class="relative w-full md:w-[300px] h-[200px] md:h-[300px] md:mt-0"
          >
            <img
              :class="{ 'cursor-pointer': baiviet.noi_dung !== '<p> </p>' }"
              @click="
                baiviet.noi_dung !== '<p> </p>' &&
                  navigateTo(`/${id}/${baiviet.duong_dan}`)
              "
              :src="JSON.parse(baiviet.anh ?? '[]')[0]"
              alt="Hoan Kiem Lake with Turtle Tower"
              class="w-full h-full object-cover rounded-lg"
            />
            <div
              class="absolute -bottom-4 -right-4 w-12 h-12 bg-black rounded-full flex items-center justify-center"
            >
              <a :href="baiviet.vi_tri" target="_blank" class="cursor-pointer">
                <i
                  :class="
                    [
                      baiviet.vi_tri?.includes('maps.app.goo.gl')
                        ? 'pi pi-map-marker'
                        : 'pi pi-link',
                    ] + ' text-white text-xl'
                  "
                ></i>
              </a>
            </div>
          </div>
        </div>
      </template>
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
const id = route.params.id;

const listBaiViet = ref<BaiVietModel[]>([]);
BaiVietService.GetBaiViet(id.toString()).then((response) => {
  listBaiViet.value = response;
});

const thuMuc = ref<ThuMucModel>();
const home = ref({
  icon: 'pi pi-home',
  route: '/',
});

const breadcrumbItems = computed(() => {
  if (!listBaiViet.value || listBaiViet.value.length === 0) return [];

  return [
    {
      label: listBaiViet.value[0].thumuc?.ten_thumuc || '',
      route: `/${listBaiViet.value[0].thumuc?.duong_dan || ''}`,
    },
  ];
});

const searchQuery = ref('');
const showDataView = ref(false);
const searchResults = ref<BaiVietModel[]>([]);

onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.relative') && showDataView.value) {
      showDataView.value = false;
    }
  });
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
</script>

<style scoped></style>
