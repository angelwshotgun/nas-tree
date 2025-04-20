<script setup lang="ts">
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import type { FormSubmitEvent, FormInstance } from "@primevue/forms/form";
import type { ThuMucModel } from "~/models/thu-muc.model";
import { ThuMucService } from "~/services/thu-muc.service";

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
    type: Object as PropType<ThuMucModel>,
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
      ten_thumuc: yup
        .string()
        .nullable()
        .required("Vui lòng nhập tên thư mục!")
        .max(100, "không được vượt quá 100 ký tự!")
        .label("tên thư mục"),
    })
  )
);

const initialValues = ref<{
  id: number;
  ten_thumuc: string | null;
  createdAt: number | null;
  updatedAt: number | null;
}>({
  id: 0,
  ten_thumuc: "",
  createdAt: null,
  updatedAt: null,
});

const onSubmit = (e: FormSubmitEvent) => {
  if (e.valid) {
    const ThuMucDTO: ThuMucModel = {
      id: initialValues.value.id,
      ten_thumuc: e.values.ten_thumuc,
    };
    confirm.require({
      message: `${
        ThuMucDTO.id != null && ThuMucDTO.id > 0
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
        if (ThuMucDTO.id != null && ThuMucDTO.id > 0) {
          ThuMucService.Update(ThuMucDTO)
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
          ThuMucService.Insert(ThuMucDTO)
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
    initialValues.value.id = props.baiViet?.id;
    initialValues.value.ten_thumuc = props.baiViet?.ten_thumuc ?? "";
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

const emit = defineEmits(["hideModal", "reloadDataTable"]);

const handleHideModal = () => {
  initialValues.value = {
    id: 0,
    ten_thumuc: "",
    createdAt: null,
    updatedAt: null,
  };
  emit("hideModal");
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
                <label for="ten_thumuc" class="block font-bold mb-3 required"
                  >Tiêu đề</label
                >
                <InputText
                  id="ten_thumuc"
                  name="ten_thumuc"
                  fluid
                  placeholder="Nhập tên thư mục"
                />
                <Message
                  v-if="$form.ten_thumuc?.invalid"
                  severity="error"
                  variant="simple"
                >
                  {{ $form.ten_thumuc.error.message }}
                </Message>
              </div>
              <div class="min-w-40">
                <label for="ten_thumuc" class="block font-bold mb-3 required"
                  >Nội dung</label
                >
                <Editor
                  id="ten_thumuc"
                  name="ten_thumuc"
                  fluid
                  placeholder="Nhập tên thư mục"
                />
                <Message
                  v-if="$form.ten_thumuc?.invalid"
                  severity="error"
                  variant="simple"
                >
                  {{ $form.ten_thumuc.error.message }}
                </Message>
              </div>
              <div class="min-w-40">
                <label for="ten_thumuc" class="block font-bold mb-3 required"
                  >Link địa chỉ</label
                >
                <InputText
                  id="ten_thumuc"
                  name="ten_thumuc"
                  fluid
                  placeholder="Nhập tên thư mục"
                  class="mb-3"
                />
                <Message
                  v-if="$form.ten_thumuc?.invalid"
                  severity="error"
                  variant="simple"
                >
                  {{ $form.ten_thumuc.error.message }}
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
