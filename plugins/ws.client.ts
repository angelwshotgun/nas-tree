export default defineNuxtPlugin(nuxtApp => {
    const ws = new WebSocket("ws://localhost:3000/ws");
  
    ws.onopen = () => console.log("✅ Connected to WebSocket");
    ws.onmessage = (event) => console.log("📩 Message:", event.data);
    ws.onclose = () => console.log("❌ Disconnected from WebSocket");
  
    // Cung cấp ws để sử dụng trong các component khác
    nuxtApp.provide('ws', ws);
  });
  