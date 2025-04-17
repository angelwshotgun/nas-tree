<script setup lang="ts">
// import { FilterMatchMode } from '@primevue/core/api';
import type { LinkModel } from '~/models/link.model';
import { LinkService } from '~/services/link.service';

const runtimeConfig = useRuntimeConfig();

const isOpenModal = ref<boolean>(false);
const toast = useToast();
const confirm = useConfirm();
const dataUpdate = ref<LinkModel>();
const dataList = ref();
const keyword = ref('');
const totalRecords = ref(0);
const currentPageNumber = ref(0);


</script>

<template>
  <div class="card">
    <DataTable
      :value="dataList"
      scrollable
      paginator
      :first="0"
      :total-records="totalRecords"
      :rows-per-page-options="[10, 20, 50]"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      current-page-report-template="hiển thị từ {first} đến {last} trong {totalRecords} liên kết"
      show-gridlines
    >
      <Column field="order_id" header="Thứ tự" style="min-width: 5rem" />
      <Column field="avatar" header="Hình ảnh" style="min-width: 12rem">
        <template #body="slotProps">
          <img
            :src="slotProps.data.avatar"
            alt="Avatar"
            style="width: 75px; height: 75px; object-fit: cover"
          />
        </template>
      </Column>
      <Column field="mo_ta" header="Mô tả" style="min-width: 12rem" />
      <Column header="Trạng thái" style="min-width: 12rem">
        <template #body="slotProps">
          <Badge
            v-if="!slotProps.data.is_enable"
            severity="danger"
            value="Không hiển thị"
            class="text-lg font-medium"
          />
          <Badge
            v-else
            severity="success"
            value="Hiển thị"
            class="text-lg font-medium"
          />
        </template>
      </Column>
      <Column field="url" header="Đường dẫn" style="min-width: 12rem" />
      <Column>
        <template #header>
          <th>Thao tác</th>
        </template>
        <template #body="slotProps">
          <div>
            <div class="flex justify-center items-center h-full">
              <Button
                icon="pi pi-ellipsis-h"
                title="Thao tác"
                class="p-button-text p-0 hover:bg-transparent focus:ring-0"
              />
            </div>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
