<script setup lang="ts">
import { yupResolver } from '@primevue/forms/resolvers/yup';
import * as yup from 'yup';
import type { FormSubmitEvent, FormInstance } from '@primevue/forms/form';
import type { ThuMucModel, ThuMucNgonNguModel } from '~/models/thu-muc.model';
import { ThuMucService } from '~/services/thu-muc.service';

const isMounted = ref(false);
const closeEscapeKeyModalInfo = ref(true);
const confirm = useConfirm();
const toast = useToast();
const thuMucSelect = ref();

const props = defineProps({
  isVisible: Boolean,
  thuMuc: Object as PropType<ThuMucModel>,
});

const internalVisible = computed({
  get: () => props.isVisible,
  set: () => handleHideModal(),
});

const form = ref<FormInstance | null>(null);
const resolver = ref(
  yupResolver(
    yup.object({
      thu_tu: yup.number().nullable().required('Vui lòng nhập thứ tự'),
      thumuc_ngonngu: yup.array().of(
        yup.object({
          ten_thumuc: yup.string().required('Vui lòng nhập tên thư mục').max(100),
          ngon_ngu: yup.string().required(),
          locale: yup.string().required(),
        })
      )
    })
  )
);

const initialValues = ref<ThuMucModel>({
  id: 0,
  thu_tu: 0,
  duong_dan: '',
  createdAt: 0,
  updatedAt: 0,
  thumuc_ngonngu: [
    { ten_thumuc: '', ngon_ngu: 'en', locale: 'en-US' },
    { ten_thumuc: '', ngon_ngu: 'vi', locale: 'vi-VN' },
    { ten_thumuc: '', ngon_ngu: 'ko', locale: 'ko-KR' },
  ],
});

const onSubmit = (e: FormSubmitEvent) => {
  if (e.valid) {
    const ThuMucDTO: ThuMucModel = {
      id: initialValues.value.id,
      thu_tu: e.values.thu_tu,
      duong_dan: '',
      thumuc_ngonngu: initialValues.value.thumuc_ngonngu,
    };
    confirm.require({
      message: ThuMucDTO.id ? 'Bạn có chắc muốn cập nhật?' : 'Bạn có chắc muốn thêm mới?',
      icon: 'pi pi-question-circle',
      rejectProps: { label: 'Hủy', severity: 'secondary', outlined: true },
      acceptProps: { label: 'Xác nhận' },
      accept: async () => {
        try {
          const response = ThuMucDTO.id
            ? await ThuMucService.Update(ThuMucDTO)
            : await ThuMucService.Insert(ThuMucDTO);
          if (response) {
            toast.add({ severity: 'success', summary: 'Thành công', detail: 'Lưu thành công!', life: 3000 });
            emit('reloadDataTable');
            handleHideModal();
          } else {
            toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Không thành công!', life: 3000 });
          }
        } catch {
          toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Có lỗi xảy ra!', life: 3000 });
        }
      }
    });
  }
};

const emit = defineEmits(['hideModal', 'reloadDataTable']);

const handleHideModal = () => {
  initialValues.value = {
    id: 0,
    thu_tu: 0,
    duong_dan: '',
    createdAt: 0,
    updatedAt: 0,
    thumuc_ngonngu: [
      { ten_thumuc: '', ngon_ngu: 'en', locale: 'en-US' },
      { ten_thumuc: '', ngon_ngu: 'vi', locale: 'vi-VN' },
      { ten_thumuc: '', ngon_ngu: 'ko', locale: 'ko-KR' },
    ],
  };
  emit('hideModal');
};

watchEffect(() => {
  if (props.thuMuc?.id) {
    initialValues.value = {
      ...props.thuMuc,
      thumuc_ngonngu: props.thuMuc.thumuc_ngonngu ?? [
        { ten_thumuc: '', ngon_ngu: 'en', locale: 'en-US' },
        { ten_thumuc: '', ngon_ngu: 'vi', locale: 'vi-VN' },
        { ten_thumuc: '', ngon_ngu: 'ko', locale: 'ko-KR' },
      ]
    };
  }
});
</script>

<template>
  <ClientOnly>
    <Dialog
      v-model:visible="internalVisible"
      class="w-[320px] sm:w-[860px]"
      :header="props.thuMuc?.id ? 'Cập nhật thư mục' : 'Thêm mới thư mục'"
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
            <Tab value="1">Tiếng Việt</Tab>
            <Tab value="2">Tiếng Hàn</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <FormThuMucNgonNgu
                v-model="initialValues.thumuc_ngonngu[0].ten_thumuc"
                label="Tên thư mục (EN)"
              />
            </TabPanel>
            <TabPanel value="1">
              <FormThuMucNgonNgu
                v-model="initialValues.thumuc_ngonngu[1].ten_thumuc"
                label="Tên thư mục (VI)"
              />
            </TabPanel>
            <TabPanel value="2">
              <FormThuMucNgonNgu
                v-model="initialValues.thumuc_ngonngu[2].ten_thumuc"
                label="Tên thư mục (KO)"
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <div class="mt-6">
          <label class="font-bold required">Thứ tự</label>
          <InputText
            name="thu_tu"
            id="thu_tu"
            placeholder="Nhập thứ tự"
            fluid
          />
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
        <Button label="Lưu" type="submit" @click="form?.submit" />
      </template>
    </Dialog>
  </ClientOnly>
</template>
