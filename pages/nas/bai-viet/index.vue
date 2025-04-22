<script setup lang="ts">
// import { FilterMatchMode } from '@primevue/core/api';
import type { ThuMucModel } from '~/models/thu-muc.model';
import { ThuMucService } from '~/services/thu-muc.service';
import type { BaiVietModel } from '~/models/bai-viet.model';
import { BaiVietService } from '~/services/bai-viet.service';

const isOpenModal = ref<boolean>(false);
const toast = useToast();
const confirm = useConfirm();
const keyWords = ref('');

const thuMucSelect = ref();

const { data: thuMucList } = useNuxtData('thuMucList');
const { data: baiVietList } = useNuxtData('baiVietList');

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
  if (!baiVietList.value) {
    try {
      const response = await BaiVietService.GetBaiViet();
      baiVietList.value = response;
      useNuxtData('baiVietList').data.value = response;
    } catch (error) {
      console.error('Error fetching bai viet:', error);
    }
  }
});

const onReloadDataTable = async () => {
  await BaiVietService.GetBaiViet().then((response) => {
    baiVietList.value = response;
    useNuxtData('baiVietList').data.value = response;
  });
};

const onHandleEdit = async (rowData: ThuMucModel) => {
  thuMucSelect.value = rowData;
  isOpenModal.value = true;
};

const onHandleDelete = (rowData: ThuMucModel) => {
  confirm.require({
    message: 'Bạn có chắc muốn xóa thông tin này',
    icon: 'pi pi-question-circle',
    rejectProps: {
      label: 'Hủy',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Xác nhận',
    },
    accept: () => {
      if (rowData) {
        ThuMucService.Delete(rowData)
          .then((response) => {
            if (response) {
              toast.add({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Xóa thông tin thành công!',
                life: 3000,
              });
              onReloadDataTable();
            } else {
              toast.add({
                severity: 'error',
                summary: 'Thất bại',
                detail: 'Xóa thông tin không thành công!',
                life: 3000,
              });
            }
          })
          .catch(() => {
            toast.add({
              severity: 'error',
              summary: 'Thất bại',
              detail: 'Xóa thông tin không thành công!',
              life: 3000,
            });
          });
      }
    },
    reject: () => {},
  });
};
</script>

<template>
  <div class="card">
    <DataTable
      :value="baiVietList"
      scrollable
      paginator
      :rows="10"
      :rows-per-page-options="[10, 20, 50]"
      paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      current-page-report-template="hiển thị từ {first} đến {last} trong {totalRecords} thư mục"
      show-gridlines
    >
      <template #header>
        <div class="flex justify-between">
          <div>
            <IconField icon-position="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                v-model="keyWords"
                placeholder="Tìm kiếm"
                class="w-full"
              />
            </IconField>
          </div>
          <div>
            <Button
              label="Thêm mới"
              icon="pi pi-plus"
              title="Thêm mới"
              @click="isOpenModal = true"
            />
          </div>
        </div>
      </template>
      <Column field="thumuc.ten_thumuc" header="Thư mục" style="min-width: 5rem" />
      <Column field="tieu_de" header="Tiêu đề" style="min-width: 5rem" />
      <Column field="vi_tri" header="Link địa chỉ" style="min-width: 5rem" />
      <Column field="anh" header="Ảnh" style="min-width: 5rem">
        <template #body="slotProps">
          <img
            :src="JSON.parse(slotProps.data.anh)[0]"
            alt="Image"
            width="100"
          />
        </template>
      </Column>
      <Column>
        <template #header>
          <th>Thao tác</th>
        </template>
        <template #body="slotProps">
          <div class="text-center">
            <Button
              v-tooltip.top="'Chỉnh sửa'"
              icon="pi pi-pencil"
              rounded
              severity="warn"
              class="mr-2"
              @click="onHandleEdit(slotProps.data)"
            />
            <Button
              v-tooltip.top="'Xóa'"
              icon="pi pi-trash"
              rounded
              severity="danger"
              @click="onHandleDelete(slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <DialogBaiViet
      v-model:is-visible="isOpenModal"
      :thu-muc-list="thuMucList"
      @hide-modal="
        isOpenModal = false;
        thuMucSelect = null;
      "
      @reload-data-table="onReloadDataTable"
    />
  </div>
</template>
