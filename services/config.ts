// Firebase initialization using NEXT_PUBLIC_ environment variables
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// These values are read from .env.local (NEXT_PUBLIC_ prefix so they are available client-side)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Validate critical env variables early to catch configuration issues during development
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];
const missingEnv = requiredEnvVars.filter((k) => !process.env[k]);
if (missingEnv.length) {
  const msg = `Missing Firebase env vars: ${missingEnv.join(', ')}`;
  if (process.env.NODE_ENV === 'production') {
    // In production, just warn so site can still boot and handle gracefully
    // (some environments may not require all features like analytics)
    console.warn(msg);
  } else {
    // Fail fast in development so developers notice configuration errors early
    throw new Error(msg);
  }
}

let analytics: ReturnType<typeof getAnalytics> | undefined;
// Only initialize analytics on the client when a measurement ID is present
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  try {
    analytics = getAnalytics(app);
  } catch {
    // Analytics may fail in some environments; ignore silently
  }
}

export { app, db, auth, analytics };
