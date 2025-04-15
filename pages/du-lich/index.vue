<template>
  <div class="p-4 mx-auto">
    <!-- Combined Destination Card with 3D Button -->
    <div class="p-4 bg-white rounded-lg mx-64 pt-16">
      <!-- Destination Info Section -->
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <!-- Text Content -->
        <div class="flex-1">
          <h2 class="text-xl font-bold mb-3">A must-visit destination - Hoan Kiem Lake.</h2>
          <p class="text-gray-700 leading-relaxed">
            Hoan Kiem Lake, located in the heart of Hanoi, is one of the city's most iconic
            landmarks. Surrounded by tree-lined streets and historical architecture, the lake is
            known for its peaceful atmosphere and the legendary story of the magical sword
            returned to the Golden Turtle God. It's a popular spot for both locals and tourists to
            relax, take a walk, and explore nearby attractions like Ngoc Son Temple and The Hue
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
          <div class="absolute -bottom-4 -right-4 w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <i class="pi pi-map-marker text-white text-xl"></i>
          </div>
        </div>
      </div>
      <div class="flex flex-col md:flex-row gap-4 mb-6">
        <!-- Text Content -->
        <div class="flex-1">
          <h2 class="text-xl font-bold mb-3">A must-visit destination - Hoan Kiem Lake.</h2>
          <p class="text-gray-700 leading-relaxed">
            Hoan Kiem Lake, located in the heart of Hanoi, is one of the city's most iconic
            landmarks. Surrounded by tree-lined streets and historical architecture, the lake is
            known for its peaceful atmosphere and the legendary story of the magical sword
            returned to the Golden Turtle God. It's a popular spot for both locals and tourists to
            relax, take a walk, and explore nearby attractions like Ngoc Son Temple and The Hue
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
          <div class="absolute -bottom-4 -right-4 w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <i class="pi pi-map-marker text-white text-xl"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});
</script>

<style scoped>
</style>