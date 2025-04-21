<script setup lang="ts">
import { yupResolver } from '@primevue/forms/resolvers/yup';
import * as yup from 'yup';
import type { FormSubmitEvent, FormInstance } from '@primevue/forms/form';
import type { ThuMucModel } from '~/models/thu-muc.model';
import { ThuMucService } from '~/services/thu-muc.service';
import type { BaiVietModel } from '~/models/bai-viet.model';
import { BaiVietService } from '~/services/bai-viet.service';

const isMounted = ref(false);
const closeEscapeKeyModalInfo = ref<boolean>(true);
const confirm = useConfirm();
const ConfirmDialog = useConfirmDialog();
const toast = useToast();
const thuMucSelect = ref();

const props = defineProps({
  isVisible: {
    type: Boolean,
  },
  thuMucList: {
    type: Object as PropType<ThuMucModel[]>,
  },
  baiViet: {
    type: Object as PropType<BaiVietModel>,
  },
});

const internalVisible = computed({
  get() {
    return props.isVisible;
  },
  set() {
    handleHideModal();
  },
});

const form = ref<FormInstance | null>(null);
const resolver = ref(
  yupResolver(
    yup.object().shape({
    })
  )
);

const initialValues = ref<{
  id: number;
  tieu_de: string | null;
  noi_dung: string | null;
  anh: string | null;
  vi_tri: string | null;
  thumucId: number | null;
  createdAt: number | null;
  updatedAt: number | null;
}>({
  id: 0,
  tieu_de: '',
  noi_dung: '',
  anh: '',
  vi_tri: '',
  thumucId: null;
  createdAt: null,
  updatedAt: null,
});

const onSubmit = (e: FormSubmitEvent) => {
  if (e.valid) {
    const BaiVietDTO = new FormData();
    BaiVietDTO.append('id', initialValues.value.id.toString());
    BaiVietDTO.append('tieu_de', e.values.tieu_de);
    BaiVietDTO.append('noi_dung', e.values.noi_dung);
    BaiVietDTO.append('vi_tri', e.values.vi_tri);
    BaiVietDTO.append('thumucId', e.values.thumucId);
    BaiVietDTO.append('image', fileUpload.value?.files);
    confirm.require({
      message: `${
        BaiVietDTO.get('id') != null && parseInt(BaiVietDTO.get('id') as string) > 0
          ? 'Bạn có chắc muốn cập nhật thông tin này?'
          : 'Bạn có chắc muốn thêm thông tin này?'
      }`,
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
        if (BaiVietDTO.get('id') != null && parseInt(BaiVietDTO.get('id') as string) > 0) {
          BaiVietService.Update(BaiVietDTO)
            .then((response) => {
              if (response) {
                toast.add({
                  severity: 'success',
                  summary: 'Thành công',
                  detail: 'Cập nhật thông tin thành công!',
                  life: 3000,
                });
                e.reset();
                emit('reloadDataTable');
                handleHideModal();
              } else {
                toast.add({
                  severity: 'error',
                  summary: 'Thất bại',
                  detail: 'Cập nhật thông tin không thành công!',
                  life: 3000,
                });
                e.reset();
                handleHideModal();
              }
            })
            .catch(() => {
              toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Đã có lỗi xảy ra, vui lòng thử lại!',
                life: 3000,
              });
              e.reset();
              handleHideModal();
            });
        } else {
          BaiVietService.Insert(BaiVietDTO)
            .then((response) => {
              if (response) {
                toast.add({
                  severity: 'success',
                  summary: 'Thành công',
                  detail: 'Thêm mới thông tin thành công!',
                  life: 3000,
                });
                e.reset();
                emit('reloadDataTable');
                handleHideModal();
              } else {
                toast.add({
                  severity: 'error',
                  summary: 'Thất bại',
                  detail: 'Thêm mới thông tin không thành công!',
                  life: 3000,
                });
                e.reset();
                handleHideModal();
              }
            })
            .catch(() => {
              toast.add({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Đã có lỗi xảy ra, vui lòng thử lại!',
                life: 3000,
              });
              e.reset();
              handleHideModal();
            });
        }
      },
      reject: () => {},
    });
  }
};

watchEffect(() => {
  if (props.baiViet?.id != undefined) {
    initialValues.value.id = props.baiViet?.id;
    initialValues.value.tieu_de = props.baiViet?.tieu_de ?? '';
    initialValues.value.createdAt = props.baiViet?.createdAt ?? null;
    initialValues.value.updatedAt = props.baiViet?.updatedAt ?? null;
  }
});

watch(
  () => props.isVisible,
  () => {
    if (props.isVisible) {
      thuMucSelect.value = props.baiViet;
    }
  },
  { immediate: true }
);

onMounted(async () => {
  isMounted.value = true;
});

const emit = defineEmits(['hideModal', 'reloadDataTable']);

const handleHideModal = () => {
  initialValues.value = {
    id: 0,
    tieu_de: '',
    noi_dung: '',
    anh: '',
    vi_tri: '',
    thumucId: null,
    createdAt: null,
    updatedAt: null,
  };
  emit('hideModal');
};

const url = ref();
const fileUpload = ref();
const isLoading = ref(false);
const uploadStatus = ref<'waiting' | 'success'>('waiting');

const onFileChange = async () => {
  uploadStatus.value = 'waiting';
  isLoading.value = true;
  const files = fileUpload.value?.files;
  console.log(fileUpload.value);
  if (files && files.length > 0) {
    isLoading.value = false;
    uploadStatus.value = 'success';
  }
};

const formatSize = (bytes: number) => {
  const k = 1024;
  const dm = 3;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedSize} ${sizes[i]}`;
};

const onRemoveFile = (index: number) => {
  if (fileUpload.value.uploadedFiles.length > 0) {
    fileUpload.value.uploadedFiles.splice(index, 1);
  }
};
</script>

<template>
  <ClientOnly>
    <Dialog
      v-model:visible="internalVisible"
      class="w-[320px] sm:w-[860px]"
      :header="`${
        props.baiViet?.id === 0 || props.baiViet?.id === undefined
          ? 'Thêm mới '
          : 'Cập nhật '
      } thư mục`"
      :modal="true"
      :close-on-escape="closeEscapeKeyModalInfo"
    >
      <div>
        <div class="flex flex-col gap-6">
          <Form
            ref="form"
            v-slot="$form"
            :initial-values
            :resolver="resolver"
            @submit="onSubmit"
          >
            <div class="gap-4 flex flex-col">
              <div class="min-w-40">
                <label for="tieu_de" class="block font-bold mb-3 required"
                  >Tiêu đề</label
                >
                <InputText
                  id="tieu_de"
                  name="tieu_de"
                  fluid
                  placeholder="Nhập tên tiêu đề"
                />
                <Message
                  v-if="$form.tieu_de?.invalid"
                  severity="error"
                  variant="simple"
                >
                  {{ $form.tieu_de.error.message }}
                </Message>
              </div>
              <div class="min-w-40">
                <label for="tieu_de" class="block font-bold mb-3 required"
                  >Tiêu đề</label
                >
                <InputText
                  id="tieu_de"
                  name="tieu_de"
                  fluid
                  placeholder="Nhập tên tiêu đề"
                />
                <Message
                  v-if="$form.tieu_de?.invalid"
                  severity="error"
                  variant="simple"
                >
                  {{ $form.tieu_de.error.message }}
                </Message>
              </div>
              <div class="min-w-40">
                <label for="noi_dung" class="block font-bold mb-3 required"
                  >Nội dung</label
                >
                <Editor
                  id="noi_dung"
                  name="noi_dung"
                  fluid
                  placeholder="Nhập tên nội dung"
                />
                <Message
                  v-if="$form.noi_dung?.invalid"
                  severity="error"
                  variant="simple"
                >
                  {{ $form.noi_dung.error.message }}
                </Message>
              </div>
              <div class="min-w-40">
                <FileUpload
                  ref="fileUpload"
                  v-model="url"
                  :multiple="true"
                  :show-upload-button="false"
                  :max-file-size="104857600"
                  invalid-file-size-message="Kích thước file quá lớn, vui lòng chọn file khác!"
                  accept="image/*"
                  choose-label="Chọn file"
                  upload-label="Tải lên"
                  cancel-label="Hủy bỏ"
                  @change="onFileChange"
                >
                  <template
                    #content="{ files, uploadedFiles, removeFileCallback }"
                  >
                    <div
                      v-if="files.length > 0"
                      class="flex flex-col gap-4 mb-4"
                    >
                      <div
                        v-for="(file, index) of files"
                        :key="file.name + file.type + file.size"
                        class="p-4 rounded-border flex flex-wrap border border-surface gap-4 items-center w-full"
                      >
                        <div class="flex flex-col gap-2">
                          <span
                            class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                            >{{ file.name }}</span
                          >
                          <div>{{ formatSize(file.size) }}</div>
                        </div>
                        <Badge
                          :value="
                            uploadStatus === 'waiting'
                              ? 'Chờ đợi'
                              : 'Thành công'
                          "
                          :severity="
                            uploadStatus === 'waiting' ? 'warn' : 'success'
                          "
                        />
                        <div class="ml-auto">
                          <Button
                            icon="pi pi-times"
                            outlined
                            rounded
                            severity="danger"
                            @click="removeFileCallback(index)"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="uploadedFiles.length > 0"
                      class="flex flex-col gap-4"
                    >
                      <div
                        v-for="(file, index) of uploadedFiles"
                        :key="file.name + file.type + file.size"
                        class="p-4 rounded-border flex flex-wrap border border-surface gap-4 items-center w-full"
                      >
                        <div class="flex flex-col gap-2">
                          <span
                            class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                            >{{ file.name }}</span
                          >
                          <div>{{ formatSize(file.size) }}</div>
                        </div>
                        <Badge value="Thành công" severity="success" />
                        <div class="ml-auto">
                          <Button
                            icon="pi pi-times"
                            outlined
                            rounded
                            severity="danger"
                            @click="onRemoveFile(index)"
                          />
                        </div>
                      </div>
                    </div>
                  </template>
                  <template #empty>
                    <div class="flex items-center justify-center flex-col">
                      <i
                        class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color"
                      />
                      <p class="mt-6 mb-0">Kéo và thả các file ảnh</p>
                    </div>
                  </template>
                </FileUpload>
              </div>
              <div class="min-w-40">
                <label for="vi_tri" class="block font-bold mb-3 required"
                  >Link địa chỉ</label
                >
                <InputText
                  id="vi_tri"
                  name="vi_tri"
                  fluid
                  placeholder="Nhập link địa chỉ"
                  class="mb-3"
                />
                <Message
                  v-if="$form.vi_tri?.invalid"
                  severity="error"
                  variant="simple"
                >
                  {{ $form.vi_tri.error.message }}
                </Message>
                <iframe
                  width="100%"
                  height="400"
                  style="border: 0"
                  loading="lazy"
                  allowfullscreen
                  referrerpolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDL4CxJZa3H9YO_wBOS6htKE2GU7SfSNyA&q=Hanoi"
                >
                </iframe>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <template #footer>
        <Button
          type="button"
          label="Đóng"
          icon="pi pi-times"
          severity="danger"
          @click="handleHideModal"
        />
        <Button label="Lưu" type="submit" @click="form?.submit" />
      </template>
    </Dialog>
  </ClientOnly>
</template>
