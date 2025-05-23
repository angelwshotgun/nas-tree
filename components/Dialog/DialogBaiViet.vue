<script setup lang="ts">
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import type { FormSubmitEvent, FormInstance } from "@primevue/forms/form";
import type { ThuMucModel } from "~/models/thu-muc.model";
import { ThuMucService } from "~/services/thu-muc.service";
import type { BaiVietModel } from "~/models/bai-viet.model";
import { BaiVietService } from "~/services/bai-viet.service";
import {
  ref as firebaseRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "~/plugins/firebase";

const isTranslating = ref(false);
const isMounted = ref(false);
const closeEscapeKeyModalInfo = ref<boolean>(true);
const confirm = useConfirm();
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

const { data: thuMucList } = useNuxtData("thuMucList");

onMounted(async () => {
  if (thuMucList.value) return;
  try {
    const response = await ThuMucService.GetThuMuc();
    thuMucList.value = response;
    useNuxtData("thuMucList").data.value = response;
  } catch (error) {
    console.error("Error fetching thu muc:", error);
  }
});

const form = ref<FormInstance | null>(null);
const resolver = ref(
  yupResolver(
    yup.object().shape({
      thumucId: yup
        .number()
        .nullable()
        .required("Vui lòng chọn thư mục!")
        .label("thư mục"),
      vi_tri: yup
        .string()
        .nullable()
        .required("Vui lòng nhập vị trí!")
        .label("vị trí"),
    })
  )
);

const initialValues = ref<BaiVietModel>({
  id: 0,
  anh: "",
  vi_tri: "",
  thumucId: 0,
  createdAt: 0,
  updatedAt: 0,
  baiviet_ngonngu: [
    { tieu_de: "", mo_ta: "", noi_dung: "", ngon_ngu: "en", locale: "en-US" },
    { tieu_de: "", mo_ta: "", noi_dung: "", ngon_ngu: "ko", locale: "ko-KR" },
    { tieu_de: "", mo_ta: "", noi_dung: "", ngon_ngu: "fr", locale: "fr-FR" },
    { tieu_de: "", mo_ta: "", noi_dung: "", ngon_ngu: "ja", locale: "ja-JP" },
    { tieu_de: "", mo_ta: "", noi_dung: "", ngon_ngu: "es", locale: "es-ES" },
    { tieu_de: "", mo_ta: "", noi_dung: "", ngon_ngu: "th", locale: "th-TH" },
  ],
});

const translateWithGenAI = async () => {
  const sourceTitle = initialValues.value.baiviet_ngonngu[0].tieu_de.trim();
  const sourceDesc = initialValues.value.baiviet_ngonngu[0].mo_ta.trim();
  const sourceContent = initialValues.value.baiviet_ngonngu[0].noi_dung.trim();

  if (!sourceTitle) {
    toast.add({
      severity: "warn",
      summary: "Cảnh báo",
      detail: "Vui lòng nhập tiêu đề tiếng Việt trước!",
      life: 3000,
    });
    return;
  }

  try {
    isTranslating.value = true;

    const responseTitle = await $fetch("/api/translate", {
      method: "POST",
      body: {
        text: sourceTitle,
        targetLanguages: ["en", "ko", "fr", "ja", "es", "th"],
      },
    });

    let responseDesc = null;
    if (sourceDesc) {
      responseDesc = await $fetch("/api/translate", {
        method: "POST",
        body: {
          text: sourceDesc,
          targetLanguages: ["en", "ko", "fr", "ja", "es", "th"],
        },
      });
    }

    let responseContent = null;
    if (sourceContent && isEnabled.value) {
      responseContent = await $fetch("/api/translate", {
        method: "POST",
        body: {
          text: sourceContent,
          targetLanguages: ["en", "ko", "fr", "ja", "es", "th"],
        },
      });
    }

    if (responseTitle && responseTitle.translations) {
      if (responseTitle.translations.ko) {
        initialValues.value.baiviet_ngonngu[1].tieu_de =
          responseTitle.translations.ko;
      }

      if (responseTitle.translations.fr) {
        initialValues.value.baiviet_ngonngu[2].tieu_de =
          responseTitle.translations.fr;
      }

      if (responseTitle.translations.ja) {
        initialValues.value.baiviet_ngonngu[3].tieu_de =
          responseTitle.translations.ja;
      }

      if (responseTitle.translations.es) {
        initialValues.value.baiviet_ngonngu[4].tieu_de =
          responseTitle.translations.es;
      }

      if (responseTitle.translations.th) {
        initialValues.value.baiviet_ngonngu[5].tieu_de =
          responseTitle.translations.th;
      }

      toast.add({
        severity: "success",
        summary: "Thành công",
        detail: "Dịch tự động tiêu đề hoàn tất!",
        life: 3000,
      });
    }

    if (responseDesc && responseDesc.translations) {
      if (responseDesc.translations.ko) {
        initialValues.value.baiviet_ngonngu[1].mo_ta =
          responseDesc.translations.ko;
      }

      if (responseDesc.translations.fr) {
        initialValues.value.baiviet_ngonngu[2].mo_ta =
          responseDesc.translations.fr;
      }

      if (responseDesc.translations.ja) {
        initialValues.value.baiviet_ngonngu[3].mo_ta =
          responseDesc.translations.ja;
      }

      if (responseDesc.translations.es) {
        initialValues.value.baiviet_ngonngu[4].mo_ta =
          responseDesc.translations.es;
      }

      if (responseDesc.translations.th) {
        initialValues.value.baiviet_ngonngu[5].mo_ta =
          responseDesc.translations.th;
      }

      toast.add({
        severity: "success",
        summary: "Thành công",
        detail: "Dịch tự động mô tả hoàn tất!",
        life: 3000,
      });
    }

    if (responseContent && responseContent.translations && isEnabled.value) {
      if (responseContent.translations.ko) {
        initialValues.value.baiviet_ngonngu[1].noi_dung = `${responseContent.translations.ko}`;
      }

      if (responseContent.translations.fr) {
        initialValues.value.baiviet_ngonngu[2].noi_dung = `${responseContent.translations.fr}`;
      }

      if (responseContent.translations.ja) {
        initialValues.value.baiviet_ngonngu[3].noi_dung = `${responseContent.translations.ja}`;
      }

      if (responseContent.translations.es) {
        initialValues.value.baiviet_ngonngu[4].noi_dung = `${responseContent.translations.es}`;
      }

      if (responseContent.translations.th) {
        initialValues.value.baiviet_ngonngu[5].noi_dung = `${responseContent.translations.th}`;
      }

      toast.add({
        severity: "success",
        summary: "Thành công",
        detail:
          "Dịch tự động nội dung hoàn tất! Lưu ý: Định dạng HTML không được giữ nguyên.",
        life: 5000,
      });
    }
  } catch (error) {
    console.error("Lỗi dịch tự động:", error);
    toast.add({
      severity: "error",
      summary: "Lỗi",
      detail: "Không thể dịch tự động!",
      life: 3000,
    });
  } finally {
    isTranslating.value = false;
  }
};

const onSubmit = (e: FormSubmitEvent) => {
  if (e.valid) {
    const baivietNgonNgu = initialValues.value.baiviet_ngonngu.map((item) => ({
      tieu_de: item.tieu_de,
      mo_ta: item.mo_ta,
      noi_dung: item.noi_dung,
      ngon_ngu: item.ngon_ngu,
      locale: item.locale,
    }));
    const BaiVietDTO: BaiVietModel = {
      id: initialValues.value.id,
      thumucId: e.values.thumucId,
      vi_tri: e.values.vi_tri,
      anh: JSON.stringify(uploadedImageUrls.value),
      baiviet_ngonngu: baivietNgonNgu,
    };
    confirm.require({
      message: `${
        BaiVietDTO.id != null && BaiVietDTO.id > 0
          ? "Bạn có chắc muốn cập nhật thông tin này?"
          : "Bạn có chắc muốn thêm thông tin này?"
      }`,
      icon: "pi pi-question-circle",
      rejectProps: {
        label: "Hủy",
        severity: "secondary",
        outlined: true,
      },
      acceptProps: {
        label: "Xác nhận",
      },
      accept: () => {
        if (BaiVietDTO.id != null && BaiVietDTO.id > 0) {
          BaiVietService.Update(BaiVietDTO)
            .then((response) => {
              if (response) {
                toast.add({
                  severity: "success",
                  summary: "Thành công",
                  detail: "Cập nhật thông tin thành công!",
                  life: 3000,
                });
                e.reset();
                emit("reloadDataTable");
                handleHideModal();
              } else {
                toast.add({
                  severity: "error",
                  summary: "Thất bại",
                  detail: "Cập nhật thông tin không thành công!",
                  life: 3000,
                });
                e.reset();
                handleHideModal();
              }
            })
            .catch(() => {
              toast.add({
                severity: "error",
                summary: "Lỗi",
                detail: "Đã có lỗi xảy ra, vui lòng thử lại!",
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
                  severity: "success",
                  summary: "Thành công",
                  detail: "Thêm mới thông tin thành công!",
                  life: 3000,
                });
                e.reset();
                emit("reloadDataTable");
                handleHideModal();
              } else {
                toast.add({
                  severity: "error",
                  summary: "Thất bại",
                  detail: "Thêm mới thông tin không thành công!",
                  life: 3000,
                });
                e.reset();
                handleHideModal();
              }
            })
            .catch(() => {
              toast.add({
                severity: "error",
                summary: "Lỗi",
                detail: "Đã có lỗi xảy ra, vui lòng thử lại!",
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
    if (props.baiViet?.noi_dung !== "") {
      isEnabled.value = true;
    }
    initialValues.value.id = props.baiViet?.id;
    initialValues.value.vi_tri = props.baiViet?.vi_tri ?? "";
    initialValues.value.thumucId = props.baiViet?.thumucId ?? 0;
    initialValues.value.anh = props.baiViet?.anh ?? "";
    initialValues.value.createdAt = props.baiViet?.createdAt ?? 0;
    initialValues.value.updatedAt = props.baiViet?.updatedAt ?? 0;

    if (props.baiViet?.anh) {
      try {
        uploadedImageUrls.value = JSON.parse(props.baiViet.anh);
      } catch (error) {
        console.error("Error parsing image URLs:", error);
        uploadedImageUrls.value = [];
      }
    }

    if (
      props.baiViet?.baiviet_ngonngu &&
      props.baiViet.baiviet_ngonngu.length > 0
    ) {
      let standardNgonNgu = [
        {
          tieu_de: "",
          mo_ta: "",
          noi_dung: "",
          ngon_ngu: "en",
          locale: "en-US",
        },
        {
          tieu_de: "",
          mo_ta: "",
          noi_dung: "",
          ngon_ngu: "ko",
          locale: "ko-KR",
        },
        {
          tieu_de: "",
          mo_ta: "",
          noi_dung: "",
          ngon_ngu: "fr",
          locale: "fr-FR",
        },
        {
          tieu_de: "",
          mo_ta: "",
          noi_dung: "",
          ngon_ngu: "ja",
          locale: "ja-JP",
        },
        {
          tieu_de: "",
          mo_ta: "",
          noi_dung: "",
          ngon_ngu: "es",
          locale: "es-ES",
        },
        {
          tieu_de: "",
          mo_ta: "",
          noi_dung: "",
          ngon_ngu: "th",
          locale: "th-TH",
        },
      ];

      for (const ngonNgu of props.baiViet.baiviet_ngonngu) {
        const index = standardNgonNgu.findIndex(
          (item) => item.ngon_ngu === ngonNgu.ngon_ngu
        );
        if (index !== -1) {
          standardNgonNgu[index] = {
            tieu_de: ngonNgu.tieu_de || "",
            mo_ta: ngonNgu.mo_ta || "",
            noi_dung: ngonNgu.noi_dung || "",
            ngon_ngu: ngonNgu.ngon_ngu || '',
            locale: ngonNgu.locale || '',
          };
        }
      }

      initialValues.value.baiviet_ngonngu = standardNgonNgu;
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
      initialValues.value?.baiviet_ngonngu?.forEach(item => {
        item.noi_dung = "";
      });
    }
  },
  { immediate: true }
);

onMounted(async () => {
  isMounted.value = true;
});

const emit = defineEmits(["hideModal", "reloadDataTable"]);

const handleHideModal = () => {
  initialValues.value = {
    id: 0,
    anh: "",
    vi_tri: "",
    thumucId: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    baiviet_ngonngu: [
      {
        tieu_de: "",
        mo_ta: "",
        noi_dung: "",
        ngon_ngu: "en", 
        locale: "en-US",
      },
      {
        tieu_de: "",
        mo_ta: "",
        noi_dung: "",
        ngon_ngu: "ko",
        locale: "ko-KR",
      },
      {
        tieu_de: "",
        mo_ta: "",
        noi_dung: "",
        ngon_ngu: "fr",
        locale: "fr-FR",
      },
      {
        tieu_de: "",
        mo_ta: "",
        noi_dung: "",
        ngon_ngu: "ja",
        locale: "ja-JP",
      },
      {
        tieu_de: "",
        mo_ta: "",
        noi_dung: "",
        ngon_ngu: "es",
        locale: "es-ES",
      },
      {
        tieu_de: "",
        mo_ta: "",
        noi_dung: "",
        ngon_ngu: "th",
        locale: "th-TH",
      },
    ],
  };
  uploadedImageUrls.value = [];
  emit("hideModal");
};

const url = ref();
const fileUpload = ref();
const isLoading = ref(false);
const uploadStatus = ref<"waiting" | "uploading" | "success" | "error">(
  "waiting"
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
    console.error("Error uploading file:", error);
    throw error;
  }
};

const onFileChange = async () => {
  uploadStatus.value = "uploading";
  isLoading.value = true;
  isUploading.value = true;

  const files = fileUpload.value?.files;

  if (files && files.length > 0) {
    try {
      const uploadPromises = Array.from(files).map(async (file: unknown) => {
        if (!(file instanceof File)) {
          throw new Error("Invalid file type");
        }

        uploadProgress.value[file.name] = 0;

        const url = await uploadToFirebase(file);

        uploadProgress.value[file.name] = 100;

        return url;
      });

      const urls = await Promise.all(uploadPromises);

      uploadedImageUrls.value = [...uploadedImageUrls.value, ...urls];

      uploadStatus.value = "success";
      toast.add({
        severity: "success",
        summary: "Thành công",
        detail: "Tải lên ảnh thành công!",
        life: 3000,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      uploadStatus.value = "error";
      toast.add({
        severity: "error",
        summary: "Lỗi",
        detail: "Tải lên ảnh không thành công!",
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
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
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
      <Form
        ref="form"
        v-slot="$form"
        :initial-values
        :resolver="resolver"
        @submit="onSubmit"
      >
        <Tabs value="0">
          <TabList>
            <Tab value="0">Tiếng Anh</Tab>
            <Tab value="1">Tiếng Hàn</Tab>
            <Tab value="2">Tiếng Pháp</Tab>
            <Tab value="3">Tiếng Nhật</Tab>
            <Tab value="4">Tiếng Tây Ban Nha</Tab>
            <Tab value="5">Tiếng Thái</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <div class="flex flex-col gap-6">
                <div class="gap-4 flex flex-col">
                  <FormBaiVietNgonNgu
                    v-model="initialValues.baiviet_ngonngu[0]"
                    language="EN"
                    :isContentEnabled="isEnabled"
                  />
                  <div class="flex justify-end">
                    <Button
                      type="button"
                      icon="pi pi-language"
                      label="Tự động dịch"
                      class="mt-2"
                      :loading="isTranslating"
                      @click="translateWithGenAI"
                    />
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="1">
              <FormBaiVietNgonNgu
                v-model="initialValues.baiviet_ngonngu[1]"
                language="KO"
                :isContentEnabled="isEnabled"
              />
            </TabPanel>
            <TabPanel value="2">
              <FormBaiVietNgonNgu
                v-model="initialValues.baiviet_ngonngu[2]"
                language="FR"
                :isContentEnabled="isEnabled"
              />
            </TabPanel>
            <TabPanel value="3">
              <FormBaiVietNgonNgu
                v-model="initialValues.baiviet_ngonngu[3]"
                language="JA"
                :isContentEnabled="isEnabled"
              />
            </TabPanel>
            <TabPanel value="4">
              <FormBaiVietNgonNgu
                v-model="initialValues.baiviet_ngonngu[4]"
                language="ES"
                :isContentEnabled="isEnabled"
              />
            </TabPanel>
            <TabPanel value="5">
              <FormBaiVietNgonNgu
                v-model="initialValues.baiviet_ngonngu[5]"
                language="TH"
                :isContentEnabled="isEnabled"
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <div class="gap-4 flex flex-col mt-6">
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
              <template #content="{ files, uploadedFiles, removeFileCallback }">
                <div v-if="files.length > 0" class="flex flex-col gap-4 mb-4">
                  <div
                    v-for="(file, index) of files"
                    :key="file.name + file.type + file.size"
                    class="p-4 rounded-border flex flex-wrap border border-surface gap-4 items-center w-full"
                  >
                    <div class="flex flex-col gap-2">
                      <span
                        class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                      >
                        {{ file.name }}
                      </span>
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
                      >
                        {{ file.name }}
                      </span>
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
