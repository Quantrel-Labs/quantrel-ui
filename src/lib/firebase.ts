// DOCS: Single Firebase initialization point.
// Exports Auth, Firestore, Storage instances and Google provider.

import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()

// Test Firebase connection
export const testFirebaseConnection = async (): Promise<boolean> => {
  try {
    // Simple connectivity test
    const testDoc = await import('firebase/firestore').then(({ doc, getDoc }) => 
      getDoc(doc(db, 'test', 'connection'))
    )
    console.log('Firebase connection test successful')
    return true
  } catch (error) {
    console.error('Firebase connection test failed:', error)
    return false
  }
}
