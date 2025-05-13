<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  isContentEnabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const updateTitle = (value) => {
  const updatedValue = { ...props.modelValue, ten_tieu_de: value };
  emit('update:modelValue', updatedValue);
};

const updateDescription = (value) => {
  const updatedValue = { ...props.modelValue, mo_ta: value };
  emit('update:modelValue', updatedValue);
};

const updateContent = (value) => {
  const updatedValue = { ...props.modelValue, noi_dung: value };
  emit('update:modelValue', updatedValue);
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="min-w-40">
      <label :for="`tieu_de_${language}`" class="block font-bold mb-3 required">
        Tiêu đề ({{ language }})
      </label>
      <InputText
        :id="`tieu_de_${language}`"
        :value="modelValue.ten_tieu_de"
        @input="updateTitle($event.target.value)"
        fluid
        :placeholder="`Nhập tiêu đề tiếng ${language}`"
      />
    </div>
    <div class="min-w-40">
      <label :for="`mo_ta_${language}`" class="block font-bold mb-3 required">
        Mô tả ({{ language }})
      </label>
      <Textarea
        :id="`mo_ta_${language}`"
        :value="modelValue.mo_ta"
        @input="updateDescription($event.target.value)"
        fluid
        :placeholder="`Nhập mô tả tiếng ${language}`"
        row="3"
      />
    </div>
    <div v-if="isContentEnabled" class="min-w-40">
      <label :for="`noi_dung_${language}`" class="block font-bold mb-3">
        Nội dung ({{ language }})
      </label>
      <Editor
        :id="`noi_dung_${language}`"
        :value="modelValue.noi_dung"
        @input="updateContent($event)"
        fluid
        :placeholder="`Nhập nội dung tiếng ${language}`"
      />
    </div>
  </div>
</template>