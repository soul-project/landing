/* eslint-disable no-console */
import { cert, initializeApp, getApp } from "firebase-admin/app";

export function getFirebaseAdminApp() {
  console.log(process.env.FIREBASE_PRIVATE_KEY);
  console.log(process.env.FIREBASE_PROJECT_ID);
  console.log(process.env.FIREBASE_CLIENT_EMAIL);

  let firebaseAdminApp;
  try {
    firebaseAdminApp = getApp();
  } catch (error) {
    firebaseAdminApp = initializeApp({
      credential: cert({
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
  }
  return firebaseAdminApp;
}
