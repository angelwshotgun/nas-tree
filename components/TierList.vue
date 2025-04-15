<script setup>
const tierLists = ref([]);
const newTierList = ref({ title: '', description: '', userId: '' });

async function fetchTierLists() {
  tierLists.value = await $fetch('/api/tierlist');
}

async function createTierList() {
  await $fetch('/api/tierlist', {
    method: 'POST',
    body: newTierList.value
  });
  newTierList.value = { title: '', description: '', userId: '' };
  fetchTierLists();
}

async function deleteTierList(id) {
  await $fetch(`/api/tierlist/${id}`, { method: 'DELETE' });
  fetchTierLists();
}

fetchTierLists();
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold">TierLists</h2>
    <form @submit.prevent="createTierList" class="space-y-2">
      <input v-model="newTierList.title" placeholder="Title" class="border p-2">
      <input v-model="newTierList.description" placeholder="Description" class="border p-2">
      <input v-model="newTierList.userId" placeholder="User ID" class="border p-2">
      <button class="bg-blue-500 text-white px-4 py-2">Add TierList</button>
    </form>
    <ul>
      <li v-for="tierList in tierLists" :key="tierList.id" class="flex justify-between">
        {{ tierList.title }} ({{ tierList.description }})
        <button @click="deleteTierList(tierList.id)" class="bg-red-500 text-white px-2">Delete</button>
      </li>
    </ul>
  </div>
</template>
