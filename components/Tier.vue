<script setup>
const tiers = ref([]);
const newTier = ref({ name: '', order: 0, tierListId: '' });

async function fetchTiers() {
  tiers.value = await $fetch('/api/tier');
}

async function createTier() {
  await $fetch('/api/tier', {
    method: 'POST',
    body: newTier.value
  });
  newTier.value = { name: '', order: 0, tierListId: '' };
  fetchTiers();
}

async function deleteTier(id) {
  await $fetch(`/api/tier/${id}`, { method: 'DELETE' });
  fetchTiers();
}

fetchTiers();
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold">Tiers</h2>
    <form @submit.prevent="createTier" class="space-y-2">
      <input v-model="newTier.name" placeholder="Name" class="border p-2">
      <input v-model="newTier.order" placeholder="Order" type="number" class="border p-2">
      <input v-model="newTier.tierListId" placeholder="TierList ID" class="border p-2">
      <button class="bg-blue-500 text-white px-4 py-2">Add Tier</button>
    </form>
    <ul>
      <li v-for="tier in tiers" :key="tier.id" class="flex justify-between">
        {{ tier.name }} (Order: {{ tier.order }})
        <button @click="deleteTier(tier.id)" class="bg-red-500 text-white px-2">Delete</button>
      </li>
    </ul>
  </div>
</template>
