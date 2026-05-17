import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Check if we have valid config or should fall back to mock
export const isMockMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "YOUR_API_KEY";

// Initialize Firebase
let app: any;
let auth: any;
let db: any;

try {
  if (!isMockMode) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  } else {
    // Mock Mode Fallback
    app = { name: "[DEFAULT]-mock" };
    auth = { currentUser: null };
    db = {};
    if (typeof window !== "undefined") {
      console.warn("Fixoo running in Mock Mode. Please set up .env.local for real Firebase features.");
    }
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
  auth = { currentUser: null };
  db = {};
  app = { name: "failed" };
}

// Analytics initialization (client-side only and if supported)
let analytics: any = null;
if (typeof window !== "undefined" && !isMockMode) {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, analytics };
