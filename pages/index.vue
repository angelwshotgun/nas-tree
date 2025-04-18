<template>
  <div
    class="card flex justify-content items-center flex-col min-h-[calc(100vh-94px)]"
  >
    <div class="p-4 w-full mx-auto">
      <!-- Search Bar -->
      <IconField class="w-[60%] mb-4 rounded-lg mx-auto">
        <InputIcon class="pi pi-search" />
        <InputText
          class="w-full p-3 rounded-lg shadow-lg"
          placeholder="Tìm kiếm"
        />
      </IconField>

      <!-- Menu Items -->
      <div class="flex flex-col gap-3 w-[80%] mx-auto">
        <template v-for="item in thuMucList" :key="item.id">
          <Button
            :unstyled="true"
            :label="item.ten_thumuc"
            class="p-3 text-red-500 bg-amber-100 border-2 border-slate-800 rounded-lg text-3xl"
            @click="navigateTo(`/${item.id}`)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ThuMucModel } from '~/models/thu-muc.model';
import { ThuMucService } from '~/services/thu-muc.service';

definePageMeta({
  layout: 'main',
  auth: false,
});

const { data: thuMucList } = useNuxtData<ThuMucModel[]>('thuMucList');

onMounted(async () => {
  if (thuMucList.value) return;
  try {
    const response = await ThuMucService.GetThuMuc();
    thuMucList.value = response;
    useNuxtData<ThuMucModel[]>('thuMucList').data.value = response;
  } catch (error) {
    console.error('Error fetching thu muc:', error);
  }
});
</script>