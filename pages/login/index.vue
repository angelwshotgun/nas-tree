<template>
  <div class="login">
    <h2>Đăng nhập</h2>
    <button @click="loginWithGoogle">Đăng nhập với Google</button>

    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Mật khẩu"
        required
      />
      <button type="submit">Đăng nhập</button>
    </form>

    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p>
      Chưa có tài khoản?
      <NuxtLink to="/register">Đăng ký ngay</NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('zmalqp123@gmail.com');
const password = ref('zmalqp123');
const errorMessage = ref('');
const { signIn, status } = useAuth();
const router = useRouter();

watchEffect(() => {
  if (status.value === 'authenticated') {
    router.push('/'); // Chuyển hướng sau khi đăng nhập thành công
  }
});

const login = async () => {
  try {
    await signIn('credentials', {
      email: email.value,
      password: password.value,
    });
  } catch (error) {
    errorMessage.value = 'Đăng nhập thất bại, kiểm tra lại thông tin!';
  }
};

const loginWithGoogle = async () => {
  try {
    await signIn('google');
  } catch (error) {
    errorMessage.value = 'Đăng nhập Google thất bại!';
  }
};

const loginWithFacebook = async () => {
  try {
    await signIn('facebook');
  } catch (error) {
    errorMessage.value = 'Đăng nhập Facebook thất bại!';
  }
};
</script>

<style scoped>
.login {
  text-align: center;
  max-width: 300px;
  margin: auto;
}
</style>
