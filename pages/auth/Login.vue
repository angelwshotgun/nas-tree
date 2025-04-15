<script setup>
definePageMeta({
  layout: false,
});

const email = ref("");
const password = ref("");
const checked = ref(false);

const { signIn, status } = useAuth();

const signInWithGoogle = async () => {
  try {
    await signIn("google");
  } catch (error) {
    console.error("Google sign-in failed:", error);
  }
};

const signInWithFacebook = async () => {
  try {
    await signIn("facebook");
  } catch (error) {
    console.error("Facebook sign-in failed:", error);
  }
};
</script>

<template>
  <FloatingConfigurator />
  <div
    class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden"
  >
    <div class="flex flex-col items-center justify-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20"
          style="border-radius: 53px"
        >
          <div class="text-center mb-8">
            <div
              class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4"
            >
              Welcome to PrimeLand!
            </div>
            <span class="text-muted-color font-medium"
              >Sign in to continue</span
            >
          </div>

          <div>
            <label
              for="email1"
              class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
              >Email</label
            >
            <InputText
              id="email1"
              type="text"
              placeholder="Email address"
              class="w-full md:w-[30rem] mb-8"
              v-model="email"
            />

            <label
              for="password1"
              class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
              >Password</label
            >
            <Password
              id="password1"
              v-model="password"
              placeholder="Password"
              :toggleMask="true"
              class="mb-4"
              fluid
              :feedback="false"
            ></Password>

            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
              <div class="flex items-center">
                <Checkbox
                  v-model="checked"
                  id="rememberme1"
                  binary
                  class="mr-2"
                ></Checkbox>
                <label for="rememberme1">Remember me</label>
              </div>
              <span
                class="font-medium no-underline ml-2 text-right cursor-pointer text-primary"
                >Forgot password?</span
              >
            </div>
            <Button
              label="Sign In"
              class="w-full"
              as="router-link"
              to="/"
            ></Button>

            <div class="flex items-center justify-center mt-8">
              <span class="text-muted-color font-medium"
                >Hoặc tiếp tục bằng</span
              >
            </div>

            <div class="flex justify-center mt-4 gap-4">
              <button
                class="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white"
                @click="signInWithFacebook"
              >
                <i class="pi pi-facebook text-xl"></i>
              </button>
              <button
                class="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white"
                @click="signInWithGoogle"
              >
                <i class="pi pi-google text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-facebook {
  font-size: 1.5rem;
}

.pi-google {
  font-size: 1.5rem;
}
</style>
