<template>
  <div class="register">
    <h2>Đăng ký tài khoản</h2>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Tên của bạn" />
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Mật khẩu"
        required
      />
      <button type="submit">Đăng ký</button>
    </form>

    <p v-if="message">{{ message }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const name = ref('');
const errorMessage = ref('');
const router = useRouter();

const register = async () => {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
      }),
    });

    if (!res.ok) {
      throw new Error('Đăng ký thất bại, kiểm tra lại thông tin!');
    }

    router.push('/login');
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<style scoped>
.register {
  text-align: center;
  max-width: 300px;
  margin: auto;
}
.error {
  color: red;
}
</style>
