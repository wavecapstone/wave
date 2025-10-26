import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa1CgouoKnC0UskXgDlEiIs97Z1jMsxIo",
  authDomain: "wave-e9c94.firebaseapp.com",
  projectId: "wave-e9c94",
  storageBucket: "wave-e9c94.firebasestorage.app",
  messagingSenderId: "516467150115",
  appId: "1:516467150115:android:2e1f1cc0f37e1412be5096",
  databaseURL: "https://wave-e9c94-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const database = getDatabase(app);
export const firestore = getFirestore(app);

export default app;
