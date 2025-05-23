<template>
  <div class="layout-wrapper">
    <div class="layout-main-container">
      <div class="layout-main">
        <div
          class="flex justify-content items-center flex-col min-h-[calc(100vh-94px)]"
        >
          <div class="p-2 w-full mx-auto">
            <AppTop />
          </div>
          <div class="card w-full !pt-0">
            <NuxtPage />
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div>
  <Toast />
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout-main-container {
  padding: 0 0 !important;
}
</style>
