<script setup lang="ts">
defineProps<{
  modelValue: string;
  label: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="font-bold required">{{ label }}</label>
    <InputText
      :modelValue="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
      placeholder="Nhập tên thư mục"
      fluid
    />
  </div>
</template>
