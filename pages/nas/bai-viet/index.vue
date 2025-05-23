<script setup lang="ts">
import { ThuMucService } from '~/services/thu-muc.service';

const { data: thuMucList } = useNuxtData('thuMucList');

onMounted(async () => {
  if (!thuMucList.value) {
    try {
      const response = await ThuMucService.GetThuMuc();
      thuMucList.value = response;
      useNuxtData('thuMucList').data.value = response;
    } catch (error) {
      console.error('Error fetching thu muc:', error);
    }
  }
});
</script>

<template>
  <div class="card">
    <Tabs :value="0" scrollable>
      <TabList>
        <Tab v-for="tab in thuMucList" :key="tab.id" :value="tab.id">{{
          tab.ten_thumuc
        }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel v-for="tab in thuMucList" :key="tab.id" :value="tab.id">
          <TabBaiViet :thumuc-id="tab.id" :thuMucList="thuMucList" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
