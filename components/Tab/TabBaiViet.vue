<template>
  <DataTable
    :value="baiVietList"
    scrollable
    paginator
    :rows="10"
    :rows-per-page-options="[10, 20, 50]"
    paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    current-page-report-template="hiển thị từ {first} đến {last} trong {totalRecords} bài viết"
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
    <Column field="tieu_de" header="Tiêu đề" style="min-width: 5rem" />
    <Column field="vi_tri" header="Link" style="min-width: 5rem" />
    <Column field="anh" header="Ảnh" style="min-width: 5rem">
      <template #body="slotProps">
        <img :src="JSON.parse(slotProps.data.anh)[0]" alt="Image" width="100" />
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
    :bai-viet="baiVietSelect"
    @hide-modal="
      isOpenModal = false;
      baiVietSelect = undefined;
    "
    @reload-data-table="onReloadDataTable"
  />
</template>

<script setup lang="ts">
import type { BaiVietModel } from '~/models/bai-viet.model';
import { BaiVietService } from '~/services/bai-viet.service';
import type { ThuMucModel } from '~/models/thu-muc.model';

const props = defineProps({
  thumucId: {
    type: Number,
  },
  thuMucList: {
    type: Array as PropType<ThuMucModel[]>,
  },
});

const isOpenModal = ref<boolean>(false);
const toast = useToast();
const confirm = useConfirm();
const keyWords = ref('');

const baiVietSelect = ref<BaiVietModel | undefined>(undefined);
const baiVietList = ref<BaiVietModel[]>([]);

onMounted(async () => {
  try {
    const baiVietResponse = await BaiVietService.GetBaiViet(props.thumucId);
    baiVietList.value = baiVietResponse;
  } catch (error) {
    console.error('Error fetching data:', error);
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Không thể tải dữ liệu!',
      life: 3000,
    });
  }
});

const onReloadDataTable = async () => {
  try {
    const response = await BaiVietService.GetBaiViet(props.thumucId);
    baiVietList.value = response;
  } catch (error) {
    console.error('Error reloading data:', error);
    toast.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Không thể tải lại dữ liệu!',
      life: 3000,
    });
  }
};

const onHandleEdit = async (rowData: BaiVietModel) => {
  baiVietSelect.value = rowData;
  isOpenModal.value = true;
};

const onHandleDelete = (rowData: BaiVietModel) => {
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
        BaiVietService.Delete(rowData)
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