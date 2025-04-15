<script setup>
const items = ref([]);
const newItem = ref({ name: '', imageUrl: '', tierId: '', tierListId: '' });

async function fetchItems() {
  items.value = await $fetch('/api/item');
}

async function createItem() {
  await $fetch('/api/item', {
    method: 'POST',
    body: newItem.value
  });
  newItem.value = { name: '', imageUrl: '', tierId: '', tierListId: '' };
  fetchItems();
}

async function deleteItem(id) {
  await $fetch(`/api/items/${id}`, { method: 'DELETE' });
  fetchItems();
}

fetchItems();
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold">Items</h2>
    <form @submit.prevent="createItem" class="space-y-2">
      <input v-model="newItem.name" placeholder="Name" class="border p-2">
      <input v-model="newItem.imageUrl" placeholder="Image URL" class="border p-2">
      <input v-model="newItem.tierId" placeholder="Tier ID" class="border p-2">
      <input v-model="newItem.tierListId" placeholder="TierList ID" class="border p-2">
      <button class="bg-blue-500 text-white px-4 py-2">Add Item</button>
    </form>
    <ul>
      <li v-for="item in items" :key="item.id" class="flex justify-between">
        <div>
          {{ item.name }} (Tier: {{ item.tierId || 'None' }}, TierList: {{ item.tierListId }})
          <img v-if="item.imageUrl" :src="item.imageUrl" alt="Item Image" class="w-10 h-10">
        </div>
        <button @click="deleteItem(item.id)" class="bg-red-500 text-white px-2">Delete</button>
      </li>
    </ul>
  </div>
</template>
