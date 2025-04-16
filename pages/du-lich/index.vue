<template>
  <Toolbar>
    <template #start>
      <Breadcrumb :home="home" :model="items">
        <template #item="{ item, props }">
          <NuxtLink
            v-if="item.route"
            v-slot="{ href, navigate }"
            :to="item.route"
            custom
          >
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="[item.icon, 'text-color']" />
              <span class="text-primary font-semibold">{{ item.label }}</span>
            </a>
          </NuxtLink>
          <a
            v-else
            :href="item.url"
            :target="item.target"
            v-bind="props.action"
          >
            <span class="text-surface-700 dark:text-surface-0">{{
              item.label
            }}</span>
          </a>
        </template>
      </Breadcrumb>
    </template>

    <template #center>
      <IconField class="w-full">
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText placeholder="Tìm kiếm" class="w-full" />
      </IconField>
    </template>
  </Toolbar>
  <div class="card mx-auto min-h-[calc(100vh-94px)]">
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <!-- Text Content -->
      <div class="flex-1">
        <h2 class="text-xl font-bold mb-3">
          A must-visit destination - Hoan Kiem Lake.
        </h2>
        <p class="text-gray-700 leading-relaxed">
          Hoan Kiem Lake, located in the heart of Hanoi, is one of the city's
          most iconic landmarks. Surrounded by tree-lined streets and historical
          architecture, the lake is known for its peaceful atmosphere and the
          legendary story of the magical sword returned to the Golden Turtle
          God. It's a popular spot for both locals and tourists to relax, take a
          walk, and explore nearby attractions like Ngoc Son Temple and The Hue
          Bridge.
        </p>
      </div>

      <!-- Image and Location Icon -->
      <div class="relative w-full md:w-80 h-48 md:h-auto">
        <img
          src="https://gocheap.vn/storage/temp/public/266/f6a/f32/5dcf54cb48b3d664114990__600.png"
          alt="Hoan Kiem Lake with Turtle Tower"
          class="w-full h-full object-cover rounded-lg"
        />
        <div
          class="absolute -bottom-4 -right-4 w-12 h-12 bg-black rounded-full flex items-center justify-center"
        >
          <a
            href="https://maps.app.goo.gl/epxUjx7pDKi6rFuAA"
            target="_blank"
            class="cursor-pointer"
          >
            <i class="pi pi-map-marker text-white text-xl"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <!-- Text Content -->
      <div class="flex-1">
        <h2 class="text-xl font-bold mb-3">
          A must-visit destination - Hoan Kiem Lake.
        </h2>
        <p class="text-gray-700 leading-relaxed">
          Hoan Kiem Lake, located in the heart of Hanoi, is one of the city's
          most iconic landmarks. Surrounded by tree-lined streets and historical
          architecture, the lake is known for its peaceful atmosphere and the
          legendary story of the magical sword returned to the Golden Turtle
          God. It's a popular spot for both locals and tourists to relax, take a
          walk, and explore nearby attractions like Ngoc Son Temple and The Hue
          Bridge.
        </p>
      </div>

      <!-- Image and Location Icon -->
      <div class="relative w-full md:w-80 h-48 md:h-auto">
        <img
          src="https://gocheap.vn/storage/temp/public/266/f6a/f32/5dcf54cb48b3d664114990__600.png"
          alt="Hoan Kiem Lake with Turtle Tower"
          class="w-full h-full object-cover rounded-lg"
        />
        <div
          class="absolute -bottom-4 -right-4 w-12 h-12 bg-black rounded-full flex items-center justify-center"
        >
          <i class="pi pi-map-marker text-white text-xl"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
  auth: false,
});

const home = ref({
  icon: "pi pi-home",
  route: "/",
});
const items = ref([{ label: "Du lịch", route: "/du-lich" }]);
</script>

<style scoped></style>
