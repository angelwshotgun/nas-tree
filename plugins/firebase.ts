// ~/plugins/firebase.ts
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app, "gs://ecommerce-b8ed2.appspot.com");

export default defineNuxtPlugin(() => {
  return {
    provide: {
      firebase: app,
      storage: storage
    }
  };
});