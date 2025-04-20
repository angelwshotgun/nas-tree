import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://ecommerce-b8ed2.appspot.com", // thay bằng bucket của bạn
  });
}

export const firebaseAdmin = admin;
export const storageBucket = admin.storage().bucket();
