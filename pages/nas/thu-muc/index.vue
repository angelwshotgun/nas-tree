<script setup lang="ts">
// import { FilterMatchMode } from '@primevue/core/api';
import type { ThuMucModel } from '~/models/thu-muc.model';
import { ThuMucService } from '~/services/thu-muc.service';

const isOpenModal = ref<boolean>(false);
const toast = useToast();
const confirm = useConfirm();
const keyWords = ref('');

const thuMucSelect = ref();

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

const onReloadDataTable = async () => {
  await ThuMucService.GetThuMuc().then((response) => {
    thuMucList.value = response;
    useNuxtData<ThuMucModel[]>('thuMucList').data.value = response;
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
      :value="thuMucList"
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
      <Column field="ten_thumuc" header="Tên thư mục" style="min-width: 5rem" />
      <Column field="thu_tu" header="Thứ tự" style="min-width: 5rem" />
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
    <DialogThuMuc
      v-model:is-visible="isOpenModal"
      :thu-muc="thuMucSelect"
      @hide-modal="isOpenModal = false; thuMucSelect = null"
      @reload-data-table="onReloadDataTable"
    />
  </div>
</template>
