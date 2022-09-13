import { cert, initializeApp, getApp } from "firebase-admin/app";

export function getFirebaseAdminApp() {
  let firebaseAdminApp;
  try {
    firebaseAdminApp = getApp();
  } catch (error) {
    firebaseAdminApp = initializeApp({
      credential: cert({
        privateKey:
          process.env.FIREBASE_PRIVATE_KEY &&
          process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });
  }
  return firebaseAdminApp;
}
