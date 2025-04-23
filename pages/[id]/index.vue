<template>
  <Toolbar>
    <template #start>
      <Breadcrumb :home="home" :model="items">
        <template #item="{ item, props }">
          <NuxtLink
            v-if="item.route"
            v-slot="{ href, navigate }"
            :to="item.route"
            custom
          >
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="[item.icon, 'text-color']" />
              <span class="text-primary font-semibold">{{ item.label }}</span>
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
    </template>

    <template #center>
      <IconField class="w-full">
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText placeholder="Tìm kiếm" class="w-full" />
      </IconField>
    </template>
  </Toolbar>
  <div class="card mx-auto min-h-[calc(100vh-94px)]">
    <div class="flex flex-col gap-5">
      <template v-for="baiviet in listBaiViet" :key="baiviet.id">
        <div class="flex flex-col md:flex-row md:px-12 gap-2">
          <div class="w-full md:w-[80%]">
            <h2 class="text-xl font-bold mb-3">
              {{ baiviet.tieu_de }}
            </h2>
            <p
              class="w-full text-gray-700 break-words text-wrap whitespace-pre-line [&_.ql-align-justify]:text-justify [&_.ql-align-center]:text-center [&_.ql-align-right]:text-right"
              v-html="baiviet.noi_dung"
            ></p>
          </div>
          <div
            class="relative w-full md:w-[300px] h-[200px] md:h-[300px] md:mt-0"
          >
            <img
              :src="JSON.parse(baiviet.anh ?? '[]')[0]"
              alt="Hoan Kiem Lake with Turtle Tower"
              class="w-full h-full object-cover rounded-lg"
            />
            <div
              class="absolute -bottom-4 -right-4 w-12 h-12 bg-black rounded-full flex items-center justify-center"
            >
              <a :href="baiviet.vi_tri" target="_blank" class="cursor-pointer">
                <i class="pi pi-map-marker text-white text-xl"></i>
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
const items = ref([
  {
    label: 'Loading...',
    route: `/${id}`,
  },
]);

ThuMucService.GetThuMucByIdPublic(Number(id)).then((response) => {
  if (response && response.ten_thumuc) {
    thuMuc.value = response;
    items.value = [
      {
        label: thuMuc.value.ten_thumuc || 'Loading...',
        route: `/${id}`,
      },
    ];
  }
});
</script>

<style scoped></style>
