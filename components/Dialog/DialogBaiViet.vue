<script setup lang="ts">
import { yupResolver } from '@primevue/forms/resolvers/yup';
import * as yup from 'yup';
import type { FormSubmitEvent, FormInstance } from '@primevue/forms/form';
import type { ThuMucModel } from '~/models/thu-muc.model';
import { ThuMucService } from '~/services/thu-muc.service';
import type { BaiVietModel } from '~/models/bai-viet.model';
import { BaiVietService } from '~/services/bai-viet.service';
import {
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { storage } from '~/plugins/firebase'; // Ensure you have this file set up with Firebase configuration

const isMounted = ref(false);
const closeEscapeKeyModalInfo = ref<boolean>(true);
const confirm = useConfirm();
const ConfirmDialog = useConfirmDialog();
const toast = useToast();
const thuMucSelect = ref();
const uploadedImageUrls = ref<string[]>([]);
const isUploading = ref(false);
const isEnabled = ref(false);

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

const { data: thuMucList } = useNuxtData('thuMucList');

onMounted(async () => {
  if (thuMucList.value) return;
  try {
    const response = await ThuMucService.GetThuMuc();
    thuMucList.value = response;
    useNuxtData('thuMucList').data.value = response;
  } catch (error) {
    console.error('Error fetching thu muc:', error);
  }
});

const form = ref<FormInstance | null>(null);
const resolver = ref(
  yupResolver(
    yup.object().shape({
      tieu_de: yup
        .string()
        .nullable()
        .required('Vui lòng nhập tiêu đề!')
        .label('tiêu đề'),
      mo_ta: yup
        .string()
        .nullable()
        .required('Vui lòng nhập mô tả!')
        .label('mô tả'),
      noi_dung: yup.string().nullable().label('nội dung'),
      thumucId: yup
        .number()
        .nullable()
        .required('Vui lòng nhập thể loại!')
        .label('thể loại'),
      vi_tri: yup
        .string()
        .nullable()
        .required('Vui lòng nhập vị trí!')
        .label('vị trí'),
    })
  )
);

const initialValues = ref<{
  id: number;
  tieu_de: string;
  mo_ta: string;
  noi_dung: string;
  anh: string;
  vi_tri: string;
  thumucId: number | null;
  createdAt: number | null;
  updatedAt: number | null;
}>({
  id: 0,
  tieu_de: '',
  mo_ta: '',
  noi_dung: '',
  anh: '',
  vi_tri: '',
  thumucId: null,
  createdAt: null,
  updatedAt: null,
});

const onSubmit = (e: FormSubmitEvent) => {
  if (e.valid) {
    const BaiVietDTO: BaiVietModel = {
      id: initialValues.value.id,
      tieu_de: e.values.tieu_de,
      mo_ta: e.values.mo_ta,
      noi_dung: e.values.noi_dung.replace(/&nbsp;/g, ' '),
      vi_tri: e.values.vi_tri,
      thumucId: e.values.thumucId,
      anh: JSON.stringify(uploadedImageUrls.value), // Convert array to JSON string
    };
    confirm.require({
      message: `${
        BaiVietDTO.id != null && BaiVietDTO.id > 0
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
        if (BaiVietDTO.id != null && BaiVietDTO.id > 0) {
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
    if (props.baiViet?.noi_dung !== '<p> </p>') {
      isEnabled.value = true;
      form.value?.setFieldValue('noi_dung', props.baiViet?.noi_dung);
    }
    initialValues.value.id = props.baiViet?.id;
    initialValues.value.tieu_de = props.baiViet?.tieu_de ?? '';
    initialValues.value.mo_ta = props.baiViet?.mo_ta ?? '';
    initialValues.value.noi_dung = props.baiViet?.noi_dung ?? '';
    initialValues.value.vi_tri = props.baiViet?.vi_tri ?? '';
    initialValues.value.thumucId = props.baiViet?.thumucId ?? null;
    initialValues.value.anh = props.baiViet?.anh ?? '';
    initialValues.value.createdAt = props.baiViet?.createdAt ?? null;
    initialValues.value.updatedAt = props.baiViet?.updatedAt ?? null;

    if (props.baiViet?.anh) {
      try {
        uploadedImageUrls.value = JSON.parse(props.baiViet.anh);
      } catch (error) {
        console.error('Error parsing image URLs:', error);
        uploadedImageUrls.value = [];
      }
    }
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

watch(
  () => isEnabled,
  () => {
    if (isEnabled.value === false) {
      initialValues.value.noi_dung = '<p> </p>';
      form.value?.setFieldValue('noi_dung', '<p> </p>');
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
    mo_ta: '',
    noi_dung: '',
    anh: '',
    vi_tri: '',
    thumucId: null,
    createdAt: null,
    updatedAt: null,
  };
  uploadedImageUrls.value = [];
  emit('hideModal');
};

const url = ref();
const fileUpload = ref();
const isLoading = ref(false);
const uploadStatus = ref<'waiting' | 'uploading' | 'success' | 'error'>(
  'waiting'
);
const uploadProgress = ref<{ [key: string]: number }>({});

const uploadToFirebase = async (file: File): Promise<string> => {
  try {
    const timestamp = new Date().getTime();
    const storageRef = firebaseRef(storage, `images/${timestamp}_${file.name}`);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

const onFileChange = async () => {
  uploadStatus.value = 'uploading';
  isLoading.value = true;
  isUploading.value = true;

  const files = fileUpload.value?.files;

  if (files && files.length > 0) {
    try {
      const uploadPromises = Array.from(files).map(async (file: unknown) => {
        if (!(file instanceof File)) {
          throw new Error('Invalid file type');
        }

        uploadProgress.value[file.name] = 0;

        const url = await uploadToFirebase(file);

        uploadProgress.value[file.name] = 100;

        return url;
      });

      const urls = await Promise.all(uploadPromises);

      uploadedImageUrls.value = [...uploadedImageUrls.value, ...urls];

      uploadStatus.value = 'success';
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Tải lên ảnh thành công!',
        life: 3000,
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      uploadStatus.value = 'error';
      toast.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Tải lên ảnh không thành công!',
        life: 3000,
      });
    } finally {
      isLoading.value = false;
      isUploading.value = false;
    }
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

const removeUploadedImage = (index: number) => {
  uploadedImageUrls.value.splice(index, 1);
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
      } bài viết`"
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
                <label for="thumucId" class="block font-bold mb-3 required"
                  >Thư mục</label
                >
                <Select
                  id="thumucId"
                  name="thumucId"
                  :options="thuMucList"
                  option-label="ten_thumuc"
                  option-value="id"
                  filter
                  class="w-full"
                  placeholder="Chọn loại thư mục"
                />
                <Message
                  v-if="$form.thumucId?.invalid"
                  severity="error"
                  variant="simple"
                >
                  {{ $form.thumucId.error.message }}
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
                <label for="mo_ta" class="block font-bold mb-3 required"
                  >Mô tả</label
                >
                <Textarea
                  id="mo_ta"
                  name="mo_ta"
                  fluid
                  placeholder="Nhập mô tả"
                  row="3"
                />
                <Message
                  v-if="$form.mo_ta?.invalid"
                  severity="error"
                  variant="simple"
                >
                  {{ $form.mo_ta.error.message }}
                </Message>
              </div>
              <div class="min-w-40">
                <label class="block font-bold mb-3 required"
                  >Có nội dung bên trong không?</label
                >
                <Select
                  v-model="isEnabled"
                  :options="[
                    { label: 'Có', value: true },
                    { label: 'Không', value: false },
                  ]"
                  option-label="label"
                  option-value="value"
                />
              </div>
              <div v-if="isEnabled" class="min-w-40">
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
                <label class="block font-bold mb-3">Ảnh</label>
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
                              : uploadStatus === 'uploading'
                              ? 'Đang tải lên'
                              : uploadStatus === 'success'
                              ? 'Thành công'
                              : 'Lỗi'
                          "
                          :severity="
                            uploadStatus === 'waiting'
                              ? 'warn'
                              : uploadStatus === 'uploading'
                              ? 'info'
                              : uploadStatus === 'success'
                              ? 'success'
                              : 'danger'
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

                    <!-- Display uploaded images -->
                    <div v-if="uploadedImageUrls.length > 0" class="mt-4">
                      <h3 class="font-bold mb-2">Ảnh đã tải lên</h3>
                      <div class="grid grid-cols-3 gap-4">
                        <div
                          v-for="(url, index) in uploadedImageUrls"
                          :key="index"
                          class="relative"
                        >
                          <img
                            :src="url"
                            alt="Uploaded"
                            class="w-full h-32 object-cover rounded"
                          />
                          <Button
                            icon="pi pi-times"
                            class="absolute top-1 right-1"
                            size="small"
                            rounded
                            severity="danger"
                            @click="removeUploadedImage(index)"
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
                <!-- Show uploaded image URLs as JSON -->
                <!-- <div v-if="uploadedImageUrls.length > 0" class="mt-4">
                  <label class="block font-bold mb-2">URLs ảnh (JSON)</label>
                  <textarea 
                    readonly 
                    class="w-full p-2 border rounded bg-gray-100" 
                    rows="3"
                  >{{ JSON.stringify(uploadedImageUrls) }}</textarea>
                </div> -->
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
        <Button
          label="Lưu"
          type="submit"
          :disabled="isUploading"
          @click="form?.submit"
        />
      </template>
    </Dialog>
  </ClientOnly>
</template>
