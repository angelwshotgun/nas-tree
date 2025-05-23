`<template>
  <Toolbar class="mb-4">
    <template #start>
      <div class="flex md:hidden">
        <a v-if="isInArticleView" @click.prevent="handleBackNavigation" href="#" class="p-2">
          <i class="pi pi-arrow-left"></i>
        </a>
        <a v-else href="/" class="p-2">
          <i class="pi pi-home"></i>
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
      <!-- Desktop Search -->
      <div class="relative w-full hidden md:block" ref="searchContainer">
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
                      <h5 class="mb-1 font-semibold">
                        {{ item.tieu_de }}
                      </h5>
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

      <!-- Mobile Search Button -->
      <div class="md:hidden w-full">
        <Button
          @click="showMobileSearch = true"
          class="w-full justify-start"
          variant="outlined"
          severity="secondary"
        >
          <i class="pi pi-search mr-2"></i>
          <span class="text-gray-500">{{ $t('search_placeholder') }}</span>
        </Button>
      </div>
    </template>

    <template #end>
      <Select
        v-model="locale"
        :options="locales"
        optionLabel="name"
        optionValue="code"
        placeholder="Language"
        class="w-32"
        @change="setLocale(locale)"
      >
        <template #dropdownicon>
          <i class="pi pi-globe" />
        </template>
      </Select>
    </template>
  </Toolbar>

  <!-- Mobile Search Overlay Dialog -->
  <Dialog 
    v-model:visible="showMobileSearch" 
    modal 
    :closable="false"
    :style="{
      width: '90vw',
      margin: '0',
      position: 'absolute',
      top: '20px',
    }"
    :contentStyle="{ padding: '0', height: '100%' }"
    class="md:hidden"
    :dismissableMask="true"
  >
    <div class="h-full flex flex-col">
      <!-- Search Header -->
      <div class="flex align-items-center p-3 border-bottom-1 border-gray-200 bg-white">
        <Button 
          @click="closeMobileSearch"
          text 
          rounded 
          class="mr-3 p-2"
        >
          <i class="pi pi-arrow-left text-xl"></i>
        </Button>
        
        <div class="flex-1">
          <IconField class="w-full">
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText
              ref="mobileSearchInput"
              v-model="mobileSearchQuery"
              :placeholder="$t('search_placeholder')"
              class="w-full"
              @input="searchMobileArticles"
            />
          </IconField>
        </div>

        <Button 
          v-if="mobileSearchQuery"
          @click="clearMobileSearch"
          text 
          rounded 
          class="ml-2 p-2"
        >
          <i class="pi pi-times"></i>
        </Button>
      </div>

      <!-- Search Results -->
      <div class="flex-1 overflow-y-auto bg-gray-50">
        <div v-if="mobileSearchQuery.length <= 2" class="p-4 text-center text-gray-500">
          <i class="pi pi-search text-4xl mb-3 block"></i>
          <p>{{ $t('search_placeholder1') || 'Nhập ít nhất 3 ký tự để tìm kiếm' }}</p>
        </div>

        <div v-else-if="mobileSearchResults.length === 0 && mobileSearchQuery.length > 2" class="p-4 text-center text-gray-500">
          <i class="pi pi-search text-4xl mb-3 block"></i>
          <p>{{ $t('search_no_results') || 'Không tìm thấy kết quả nào' }}</p>
        </div>

        <div v-else class="p-2">
          <div
            v-for="(item, index) in mobileSearchResults"
            :key="index"
            class="bg-white rounded-lg shadow-sm mb-2 cursor-pointer hover:shadow-md transition-shadow"
            @click="selectMobileItem(item)"
          >
            <div class="flex p-4">
              <div v-if="item.anh" class="mr-4 flex-shrink-0">
                <img
                  :src="JSON.parse(item.anh)[0]"
                  :alt="item.tieu_de"
                  class="w-20 h-20 object-cover rounded-lg"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-lg mb-2 line-clamp-2">
                  {{ item.tieu_de }}
                </h3>
                <p class="text-gray-600 text-sm line-clamp-3 mb-2">
                  {{ item.baiviet_ngonngu?.find((t) => t.ngon_ngu === locale)?.mo_ta }}
                </p>
              </div>
              <div class="flex align-items-center ml-2">
                <i class="pi pi-chevron-right text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import type { BaiVietModel } from '~/models/bai-viet.model';
import type { ThuMucModel } from '~/models/thu-muc.model';
import { BaiVietService } from '~/services/bai-viet.service';
import { ThuMucService } from '~/services/thu-muc.service';

const { locale, locales, setLocale, t: $t } = useI18n();

const route = useRoute();

// Compute current route parameters instead of using static variables
const currentParams = computed(() => {
  return {
    id: route.params.id as string,
    baivietp: route.params.baiviet as string
  };
});

// Computed property to check if we're in an article view
const isInArticleView = computed(() => {
  return !!currentParams.value.baivietp && currentParams.value.baivietp.length > 0;
});

// Lấy thông tin bài viết chính
const baiviet = ref<BaiVietModel>();
const relatedArticles = ref<BaiVietModel[]>([]);

// Desktop search
const searchQuery = ref('');
const showDataView = ref(false);
const searchResults = ref<BaiVietModel[]>([]);

// Mobile search
const showMobileSearch = ref(false);
const mobileSearchQuery = ref('');
const mobileSearchResults = ref<BaiVietModel[]>([]);
const mobileSearchInput = ref();

const { data: thuMucList } = useNuxtData<ThuMucModel[]>('thuMucList');

onMounted(async () => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.relative') && showDataView.value) {
      showDataView.value = false;
    }
  });

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
    const response = await BaiVietService.SearchBaiViet(searchQuery.value, locale.value);
    searchResults.value = response;
  } catch (error) {
    console.error('Lỗi khi tìm kiếm bài viết:', error);
  }
};

const searchMobileArticles = async () => {
  if (mobileSearchQuery.value.length > 2) {
    try {
      const response = await BaiVietService.SearchBaiViet(mobileSearchQuery.value, locale.value);
      mobileSearchResults.value = response;
    } catch (error) {
      console.error('Lỗi khi tìm kiếm bài viết:', error);
      mobileSearchResults.value = [];
    }
  } else {
    mobileSearchResults.value = [];
  }
};

const selectItem = (item: BaiVietModel) => {
  navigateTo(`/${thuMucList.value?.find((t) => t.id === item.thumucId)?.duong_dan}/${item.baiviet_ngonngu?.find((t) => t.ngon_ngu === locale.value)?.duong_dan}`);
  showDataView.value = false;
};

const selectMobileItem = (item: BaiVietModel) => {
  navigateTo(`/${thuMucList.value?.find((t) => t.id === item.thumucId)?.duong_dan}/${item.baiviet_ngonngu?.find((t) => t.ngon_ngu === locale.value)?.duong_dan}`);
  showMobileSearch.value = false;
  mobileSearchQuery.value = '';
  mobileSearchResults.value = [];
};

const closeMobileSearch = () => {
  showMobileSearch.value = false;
  mobileSearchQuery.value = '';
  mobileSearchResults.value = [];
};

const clearMobileSearch = () => {
  mobileSearchQuery.value = '';
  mobileSearchResults.value = [];
  nextTick(() => {
    mobileSearchInput.value?.$el?.focus();
  });
};

// Auto focus when mobile search opens
watch(showMobileSearch, (newValue) => {
  if (newValue) {
    nextTick(() => {
      mobileSearchInput.value?.$el?.focus();
    });
  }
});

watch(() => route.params, (newParams) => {
  // This watcher will trigger whenever route params change
  // We don't need to do anything here since our computed properties will handle the updates
}, { deep: true });

watch(searchQuery, (newValue) => {
  if (newValue.length > 2) {
    showDataView.value = true;
    searchArticles();
  } else {
    searchResults.value = [];
  }
});

// Determine back navigation path based on current route
const backNavigationPath = computed(() => {
  if (breadcrumbItems.value.length > 0) {
    // Extract the folder path from the first breadcrumb item
    return `/${breadcrumbItems.value[0].route.split('/')[1]}`;
  }
  return '/';
});

// Handle back navigation
const handleBackNavigation = () => {
  if (isInArticleView.value && breadcrumbItems.value.length > 0) {
    navigateTo(backNavigationPath.value);
  } else {
    navigateTo('/');
  }
};

const home = ref({
  icon: 'pi pi-home',
  route: '/',
});

const breadcrumbItems = computed(() => {
  const segments = route.path.split('/').filter(Boolean);
  const items = [];

  if (segments.length > 0) {
    const thuMucItem = thuMucList.value?.find(
      (t) => t.duong_dan === segments[0]
    );

    if (thuMucItem) {
      items.push({
        label:
          thuMucItem.thumuc_ngonngu?.find((t) => t.ngon_ngu === locale.value)
            ?.ten_thumuc || '',
        route: `/${thuMucItem.duong_dan}`,
      });
    }

    if (segments.length > 1) {
      const baiViet = searchResults.value?.find(
        (b) => b.duong_dan === segments[1]
      );
      if (baiViet) {
        items.push({
          label: baiViet.tieu_de || '',
          route: `/${segments[0]}/${baiViet.duong_dan}`,
        });
      }
    }
  }

  return items;
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom dialog styles for mobile */
:deep(.p-dialog.md\\:hidden .p-dialog-content) {
  border-radius: 0;
  height: 100%;
}

:deep(.p-dialog.md\\:hidden .p-dialog-mask) {
  background: rgba(0, 0, 0, 0.1);
}
</style>
