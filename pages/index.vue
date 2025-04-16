<template>
  <div
    class="card flex justify-content items-center flex-col min-h-[calc(100vh-94px-2rem)]"
  >
    <div class="p-4 w-full mx-auto">
      <!-- Search Bar -->
      <IconField class="w-[60%] mb-4 rounded-lg mx-auto">
        <InputIcon class="pi pi-search" />
        <InputText
          class="w-full p-3 rounded-lg shadow-lg"
          placeholder="Tìm kiếm"
        />
      </IconField>

      <!-- Menu Items -->
      <div class="flex flex-col gap-3 w-[80%] mx-auto">
        <Button
          :unstyled="true"
          label="Quán ăn"
          class="p-3 text-red-500 bg-amber-100 border-2 border-slate-800 rounded-lg text-3xl"
          @click="navigateTo('/du-lich')"
        />

        <Button
          :unstyled="true"
          label="Địa điểm du lịch"
          class="p-3 text-red-500 bg-amber-100 border-2 border-slate-800 rounded-lg text-3xl"
          @click="navigateTo('/du-lich')"
        />

        <Button
          :unstyled="true"
          label="Tour"
          class="p-3 text-red-500 bg-amber-100 border-2 border-slate-800 rounded-lg text-3xl"
          @click="navigateTo('/du-lich')"
        />

        <Button
          :unstyled="true"
          label="ABC XYZ"
          class="p-3 text-red-500 bg-amber-100 border-2 border-slate-800 rounded-lg text-3xl"
          @click="navigateTo('/du-lich')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});
</script>

