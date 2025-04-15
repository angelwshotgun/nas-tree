<template>
  <div class="container">
    <button class="toggle-btn" @click="toggleSidebar">
      {{ isOpen ? '✖ Close Menu' : '☰ Open Menu' }}
    </button>
    <div
      v-gsap.fromTo="[sidebarAnimation, sidebarAnimation1]"
      :key="isOpen"
      class="menu-sidebar"
    >
      <h2>Sidebar Menu</h2>
      <p>Menu content here...</p>
    </div>
    <div
      v-gsap.fromTo="[contentAnimation, contentAnimation1]"
      :key="isOpen"
      class="main-content"
    >
      <div
        v-gsap.to="{ x: 100, duration: 2, delay: 1, repeat: -1, yoyo: true }"
        class="bg-gray-500 p-4 w-[100px] h-[100px]"
      >
        <h4>.to sang trái</h4>
      </div>
      <div
        v-gsap.to="{
          x: 100,
          duration: 2,
          ease: 'power2.out',
          delay: 1,
          repeat: -1,
          yoyo: true,
        }"
        class="bg-gray-500 p-4 w-[100px] h-[100px]"
      >
        <h4>.to sang trái with ease</h4>
      </div>
      <div
        v-gsap.to="{
          backgroundColor: '#0000FF',
          duration: 2,
          repeat: -1,
          yoyo: true,
        }"
        class="bg-red-500 p-4 w-[100px] h-[100px] rounded-full"
      ></div>
      <button v-gsap.whileHover.to="{ scale: 2 }">
        <label v-gsap.to="{ opacity: 0, repeat: -1, yoyo: true }">faded</label>
      </button>
      <div v-gsap.stagger.to.infinitely="animationOptions" class="typewriter">
        <span v-for="(char, index) in text" :key="index">{{ char }}</span>
      </div>
      <div
        v-gsap.from="{
          rotation: -15,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        }"
        v-gsap.to="{
          rotation: 15,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        }"
        class="bg-red-500 p-4 w-[100px] h-[100px]"
      ></div>
      <section v-gsap.timeline>
        <h1
          v-gsap.add.order-0.from="{ opacity: 0 }"
          v-gsap.add.order-2.to="{
            y: '-100px',
            delay: 5,
            yoyo: true,
            repeat: 1,
          }"
        >
          Hello World
        </h1>
        <h2 v-gsap.add.order-1.from="{ x: -32, delay: 1 }">Still here</h2>
        <!-- Order: 1 -->
      </section>
      <div
        v-gsap.to="{
          motionPath: {
            path: [
              { x: 0, y: 0 },
              { x: 100, y: -100 },
              { x: 200, y: 0 },
              { x: 100, y: 100 },
              { x: 0, y: 0 },
            ],
            curviness: 1.8,
            autoRotate: true,
          },
          duration: 4,
          repeat: -1,
          ease: 'none',
        }"
        class="bg-red-500 p-4 w-[100px] h-[100px] rounded-full"
      ></div>
      <div
        v-gsap.to="{
          x: '200px',
          rotation: '+=360',
          backgroundColor: '#0000FF',
          duration: 2,
          repeat: -1,
          yoyo: true,
        }"
        class="bg-red-500 p-4 w-[100px] h-[100px]"
      ></div>
      <div
        ref="imageContainer"
        class="image-wrapper"
        @mouseenter="hover = true"
        @mousemove="onMouseMove"
        @mouseleave="hover = false"
      >
        <!-- Ảnh gốc -->
        <img src="https://picsum.photos/300" class="image" />

        <!-- Ô zoom tại vị trí chuột -->
        <div
          v-if="hover"
          class="zoom-box"
          :style="{
            left: `${cursorX - zoomSize / 2}px`,
            top: `${cursorY - zoomSize / 2}px`,
            backgroundPosition: `${-cursorX * zoomFactor + zoomSize / 2}px ${
              -cursorY * zoomFactor + zoomSize / 2
            }px`,
          }"
        ></div>
      </div>
      <div class="card-container">
        <div
          class="card"
          @mouseenter="isFlipped = true"
          @mouseleave="isFlipped = false"
          v-gsap.to="{
            rotationY: isFlipped ? 180 : 0,
            duration: 0.6,
            ease: 'power2.out',
          }"
          :key="isFlipped"
        >
          <!-- Mặt trước -->
          <div class="card-front">
            <p>Front</p>
          </div>

          <!-- Mặt sau -->
          <div class="card-back">
            <p>Back</p>
          </div>
        </div>
      </div>
      <div
        v-gsap.fromTo="[zoomAnimation, zoomAnimation1]"
        :key="hover"
        class="bg-red-500 p-4 w-[100px] h-[100px]"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
      ></div>
      <div class="screen" @click="createRipple">
        <div
          v-for="ripple in ripples"
          :key="ripple.id"
          v-gsap.to="{
            scale: 50,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out',
            onComplete: () => removeRipple(ripple.id),
          }"
          class="ripple"
          :style="{ left: `${ripple.x}px`, top: `${ripple.y}px` }"
        ></div>
      </div>
      <div class="h-[1000px]"></div>
    </div>
  </div>
</template>

<script setup>
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from 'gsap/all';
onBeforeMount(() => {
  useGSAP().registerPlugin(MotionPathPlugin);
});

const text = computed(() => 'Hello, GSAP Typewriter Effect!'.split(''));
const animationOptions = {
  opacity: 1,
  x: 20,
  stagger: 0.1,
  duration: 0.1,
  ease: 'steps(1)',
  yoyo: false,
};
const sidebarAnimation = computed(() => ({
  x: isOpen.value ? '-100%' : '0px',
  duration: 0.5,
  ease: 'power2.out',
}));
const sidebarAnimation1 = computed(() => ({
  x: isOpen.value ? '0px' : '-100%',
  duration: 0.5,
  ease: 'power2.out',
}));
const contentAnimation = computed(() => ({
  x: isOpen.value ? '0px' : '190px',
  duration: 0.5,
  ease: 'power2.out',
}));
const contentAnimation1 = computed(() => ({
  x: isOpen.value ? '190px' : '0px',
  duration: 0.5,
  ease: 'power2.out',
}));
const isOpen = ref(false);
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
const hover = ref(false);
const cursorX = ref(0);
const cursorY = ref(0);
const zoomFactor = 2; // Hệ số zoom
const zoomSize = 80; // Kích thước ô zoom
const imageContainer = ref(null);
const onMouseMove = (event) => {
  if (!imageContainer.value) return;

  const rect = imageContainer.value.getBoundingClientRect();
  cursorX.value = event.clientX - rect.left;
  cursorY.value = event.clientY - rect.top;
};
const zoomAnimation = computed(() => ({
  scale: hover.value ? 1 : 2,
  duration: 0.5,
  ease: 'power2.out',
}));
const zoomAnimation1 = computed(() => ({
  scale: hover.value ? 2 : 1,
  duration: 0.5,
  ease: 'power2.out',
}));
const ripples = ref([]);
const createRipple = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const newRipple = {
    id: Date.now(), // ID duy nhất
    x: event.clientX - rect.left, // X chính xác trong phần tử
    y: event.clientY - rect.top, // Y chính xác trong phần tử
  };
  ripples.value.push(newRipple);
};
const removeRipple = (id) => {
  ripples.value = ripples.value.filter((ripple) => ripple.id !== id);
};
const isFlipped = ref(false);
</script>

<style>
body {
  margin: 0;
}
.container {
  display: flex;
  height: 100vh;
}
.toggle-btn {
  z-index: 99;
  position: absolute;
  top: 20px;
  left: 400px;
  background: #ff6600;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
.menu-sidebar {
  width: 150px;
  position: fixed;
  top: 0;
  height: 100%;
  padding: 20px;
  background: #333;
}
.main-content {
  margin-left: 0;
}
.typewriter {
  font-size: 24px;
  font-family: monospace;
  color: red;
  white-space: pre;
}
span {
  opacity: 0;
  display: inline-block;
  transform: translateX(-20px);
}
.ripple {
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: scale(0);
  pointer-events: none;
}
.screen {
  width: 100vw;
  height: 100vh;
  background: #222;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.image-wrapper {
  width: 300px;
  height: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

/* Ảnh gốc */
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Ô zoom */
.zoom-box {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 2px solid white;
  background-image: url('https://picsum.photos/300');
  background-size: 600px 400px; /* (300x2, 200x2) */
  pointer-events: none;
}
.wave-container {
  width: 100%;
  overflow: hidden;
}
svg {
  width: 100%;
  height: 100px;
}
.card-container {
  perspective: 1000px;
  width: 200px;
  height: 300px;
}

/* Thẻ bài */
.card {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  position: relative;
  cursor: pointer;
}

/* Mặt trước & Mặt sau */
.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 12px;
}

/* Mặt trước */
.card-front {
  background-color: #3498db;
  color: white;
}

/* Mặt sau */
.card-back {
  background-color: #e74c3c;
  color: white;
  transform: rotateY(180deg);
}
</style>
