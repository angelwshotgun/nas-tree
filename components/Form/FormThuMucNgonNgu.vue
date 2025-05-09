<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Nhập tên thư mục',
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="mb-3">
    <label class="font-bold required">{{ label }}</label>
    <InputText
      :model-value="modelValue"
      @update:model-value="(val) => emit('update:modelValue', val)"
      :placeholder="placeholder"
      class="w-full"
    />
  </div>
</template>