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
const isTranslating = ref(false);

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

// Định nghĩa đúng thứ tự các ngôn ngữ với đúng locale tương ứng
const initialValues = ref<ThuMucModel>({
  id: 0,
  thu_tu: 0,
  duong_dan: '',
  createdAt: 0,
  updatedAt: 0,
  thumuc_ngonngu: [
    { ten_thumuc: '', ngon_ngu: 'en', locale: 'en-US' },
    { ten_thumuc: '', ngon_ngu: 'ko', locale: 'ko-KR' },
    { ten_thumuc: '', ngon_ngu: 'fr', locale: 'fr-FR' },
    { ten_thumuc: '', ngon_ngu: 'ja', locale: 'ja-JP' },
    { ten_thumuc: '', ngon_ngu: 'es', locale: 'es-ES' },
    { ten_thumuc: '', ngon_ngu: 'th', locale: 'th-TH' },
  ],
});

// Hàm dịch tự động sử dụng Google GenAI
const translateWithGenAI = async () => {
  const englishText = initialValues.value.thumuc_ngonngu[0].ten_thumuc.trim();
  
  if (!englishText) {
    toast.add({ severity: 'warn', summary: 'Cảnh báo', detail: 'Vui lòng nhập tên thư mục tiếng Anh trước!', life: 3000 });
    return;
  }
  
  try {
    isTranslating.value = true;
    
    // Gọi API dịch
    const response = await $fetch('/api/translate', {
      method: 'POST',
      body: {
        text: englishText,
        targetLanguages: ['ko', 'fr', 'ja', 'es', 'th'],
      }
    });
    
    // Kiểm tra và cập nhật các bản dịch
    if (response && response.translations) {
 
      // Cập nhật tiếng Hàn
      if (response.translations.ko) {
        initialValues.value.thumuc_ngonngu[2].ten_thumuc = response.translations.ko;
      }

      // Cập nhật tiếng Pháp
      if (response.translations.fr) {
        initialValues.value.thumuc_ngonngu[3].ten_thumuc = response.translations.fr;
      }

      // Cập nhật tiếng Nhật
      if (response.translations.ja) {
        initialValues.value.thumuc_ngonngu[4].ten_thumuc = response.translations.ja;
      }

      // Cập nhật tiếng Tây Ban Nha
      if (response.translations.es) {
        initialValues.value.thumuc_ngonngu[5].ten_thumuc = response.translations.es;
      }

      // Cập nhật tiếng Thái
      if (response.translations.th) {
        initialValues.value.thumuc_ngonngu[6].ten_thumuc = response.translations.th;
      }
      
      toast.add({ severity: 'success', summary: 'Thành công', detail: 'Dịch tự động hoàn tất!', life: 3000 });
    } else {
      toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Không nhận được kết quả dịch!', life: 3000 });
    }
  } catch (error) {
    console.error('Lỗi dịch tự động:', error);
    toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Không thể dịch tự động!', life: 3000 });
  } finally {
    isTranslating.value = false;
  }
};

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
      { ten_thumuc: '', ngon_ngu: 'ko', locale: 'ko-KR' },
      { ten_thumuc: '', ngon_ngu: 'fr', locale: 'fr-FR' },
    { ten_thumuc: '', ngon_ngu: 'ja', locale: 'ja-JP' },
    { ten_thumuc: '', ngon_ngu: 'es', locale: 'es-ES' },
    { ten_thumuc: '', ngon_ngu: 'th', locale: 'th-TH' },
    ],
  };
  emit('hideModal');
};

watchEffect(() => {
  if (props.thuMuc?.id) {
    // Clone thư mục và sắp xếp lại ngôn ngữ nếu cần
    const thuMuc = { ...props.thuMuc };
    let standardNgonNgu = [
      { ten_thumuc: '', ngon_ngu: 'en', locale: 'en-US' },
      { ten_thumuc: '', ngon_ngu: 'ko', locale: 'ko-KR' },
      { ten_thumuc: '', ngon_ngu: 'fr', locale: 'fr-FR' },
    { ten_thumuc: '', ngon_ngu: 'ja', locale: 'ja-JP' },
    { ten_thumuc: '', ngon_ngu: 'es', locale: 'es-ES' },
    { ten_thumuc: '', ngon_ngu: 'th', locale: 'th-TH' },
    ];
    
    // Nếu đã có dữ liệu thumuc_ngonngu, cần đảm bảo thứ tự đúng
    if (thuMuc.thumuc_ngonngu && thuMuc.thumuc_ngonngu.length > 0) {
      // Gán giá trị từ dữ liệu hiện có vào đúng vị trí
      for (const ngonNgu of thuMuc.thumuc_ngonngu) {
        const index = standardNgonNgu.findIndex(item => item.ngon_ngu === ngonNgu.ngon_ngu);
        if (index !== -1) {
          standardNgonNgu[index] = { ...ngonNgu };
        }
      }
    }
    
    initialValues.value = {
      ...thuMuc,
      thumuc_ngonngu: standardNgonNgu
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
            <Tab value="1">Tiếng Hàn</Tab>
            <Tab value="2">Tiếng Pháp</Tab>
            <Tab value="3">Tiếng Nhật</Tab>
            <Tab value="4">Tiếng Tây Ban Nha</Tab>
            <Tab value="5">Tiếng Thái</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <div class="flex flex-col gap-2">
                <FormThuMucNgonNgu
                  v-model="initialValues.thumuc_ngonngu[0].ten_thumuc"
                  label="Tên thư mục (EN)"
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
            </TabPanel>
            <TabPanel value="1">
              <FormThuMucNgonNgu
                v-model="initialValues.thumuc_ngonngu[1].ten_thumuc"
                label="Tên thư mục (KO)"
              />
            </TabPanel>
            <TabPanel value="2">
              <FormThuMucNgonNgu
                v-model="initialValues.thumuc_ngonngu[2].ten_thumuc"
                label="Tên thư mục (FR)"
              />
            </TabPanel>
            <TabPanel value="3">
              <FormThuMucNgonNgu
                v-model="initialValues.thumuc_ngonngu[3].ten_thumuc"
                label="Tên thư mục (JA)"
              />
            </TabPanel>
            <TabPanel value="4">
              <FormThuMucNgonNgu
                v-model="initialValues.thumuc_ngonngu[4].ten_thumuc"
                label="Tên thư mục (ES)"
              />
            </TabPanel>
            <TabPanel value="5">
              <FormThuMucNgonNgu
                v-model="initialValues.thumuc_ngonngu[5].ten_thumuc"
                label="Tên thư mục (TH)"
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