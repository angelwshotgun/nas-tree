<template>
  <div class="flex flex-col gap-3 container1 mx-auto">
    <template v-for="item in thuMucList" :key="item.id">
      <Button
        :unstyled="true"
        :label="
          item.thumuc_ngonngu?.find((t) => t.ngon_ngu === locale)?.ten_thumuc ||
          ''
        "
        class="p-3 text-red-500 bg-amber-100 border-2 border-slate-800 rounded-lg text-3xl"
        @click="navigateTo(`/${item.duong_dan}`)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ThuMucModel } from '~/models/thu-muc.model';
import { ThuMucService } from '~/services/thu-muc.service';

definePageMeta({
  layout: 'main',
  auth: false,
});

const { locale } = useI18n();
const { data: thuMucList } = useNuxtData<ThuMucModel[]>('thuMucList');

onMounted(async () => {
  try {
    if (thuMucList.value) return;
    const response = await ThuMucService.GetThuMucPublic();
    thuMucList.value = response;
    useNuxtData<ThuMucModel[]>('thuMucList').data.value = response;
  } catch (error) {
    console.error('Error fetching thu muc:', error);
  }
});
</script>
