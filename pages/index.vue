<template>
  <div
    class="card flex justify-content items-center flex-col min-h-[calc(100vh-94px)]"
  >
    <div class="p-4 w-full mx-auto">
      <!-- Search Bar -->
      <div
        class="relative w-full md:w-[80%] lg:w-[60%] mx-auto pb-6"
        ref="searchContainer"
      >
        <IconField class="w-full">
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="searchQuery"
            class="w-full"
            :placeholder="$t('search_placeholder')"
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
                {{ $t('search_placeholder1') }}
              </div>
            </template>
          </DataView>
        </div>
      </div>

      <div class="flex justify-end mb-4">
        <Button
          v-for="locale in locales"
          :key="locale.code"
          class="p-button-text"
          severity="secondary"
          @click="
            setLocale(locale.code);
          "
        >
          {{ locale.name }}
        </Button>
      </div>

      <!-- Menu Items -->
      <div class="flex flex-col gap-3 w-full sm:w-[90%] md:w-[80%] mx-auto">
        <template v-for="item in thuMucList" :key="item.id">
          <Button
            :unstyled="true"
            :label="item.thumuc_ngonngu?.find((t) => t.ngon_ngu === locale)?.ten_thumuc || ''"
            class="p-3 text-red-500 bg-amber-100 border-2 border-slate-800 rounded-lg text-3xl"
            @click="navigateTo(`/${item.duong_dan}`)"
          />
        </template>
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

const { locale, locales, setLocale, t } = useI18n();
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
  if (thuMucList.value) return;
  try {
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
</script>
