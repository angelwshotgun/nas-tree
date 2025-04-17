<script setup>
const model = ref([
  {
    label: 'Home',
    items: [{ label: 'Thư mục', icon: 'pi pi-fw pi-home', to: '/nas/thu-muc' }],
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
