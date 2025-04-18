<script setup>
const model = ref([
  {
    label: 'Home',
    items: [
      { label: 'Thư mục', icon: 'pi pi-fw pi-folder', to: '/nas/thu-muc' },
      { label: 'Bài viết', icon: 'pi pi-fw pi-file-edit', to: '/nas/bai-viet' },
    ],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <AppMenuItem v-if="!item.separator" :item="item" :index="i" />
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
