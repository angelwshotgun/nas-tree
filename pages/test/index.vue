<script setup lang="ts">
const { status, data, send, open, close } = useWebSocket(
  'ws://localhost:3000/api/websocket'
);
const messages = ref<string[]>([]);

watch(data, async (newData) => {
  if (newData instanceof Blob) {
    const text = await newData.text();
    messages.value.push('server:', text);
  } else if (typeof newData === 'string') {
    messages.value.push('server:', newData);
  } else if (newData) {
    messages.value.push('server:', JSON.stringify(newData));
  }
});
const message = ref('');
function sendData() {
  messages.value.push('client:', message.value);
  send(message.value);
  message.value = '';
}
</script>

<template>
  <div>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>
    <input v-model="message" placeholder="Nhập tin nhắn..." />
    <button @click="sendData">Gửi</button>
  </div>
</template>
