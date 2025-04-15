<script setup>
const users = ref([]);
const newUser = ref({ email: '', name: '' });

async function fetchUsers() {
  users.value = await $fetch('/api/user');
}

async function createUser() {
  await $fetch('/api/user', {
    method: 'POST',
    body: newUser.value
  });
  newUser.value = { email: '', name: '' };
  fetchUsers();
}

async function deleteUser(id) {
  await $fetch(`/api/user/${id}`, { method: 'DELETE' });
  fetchUsers();
}

fetchUsers();
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold">Users</h2>
    <form @submit.prevent="createUser" class="space-y-2">
      <input v-model="newUser.email" placeholder="Email" class="border p-2">
      <input v-model="newUser.name" placeholder="Name" class="border p-2">
      <button class="bg-blue-500 text-white px-4 py-2">Add User</button>
    </form>
    <ul>
      <li v-for="user in users" :key="user.id" class="flex justify-between">
        {{ user.email }} ({{ user.name }})
        <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-2">Delete</button>
      </li>
    </ul>
  </div>
</template>
