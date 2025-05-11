import { initializeApp } from "firebase/app";

import { 
	getFirestore,
	initializeFirestore,
	persistentLocalCache,
	persistentMultipleTabManager
} from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDNgPttDg3Yklxhj9wITPJ7WuQeFoh9FWs",
  authDomain: "task-ba00e.firebaseapp.com",
  projectId: "task-ba00e",
  storageBucket: "task-ba00e.firebasestorage.app",
  messagingSenderId: "171112861266",
  appId: "1:171112861266:web:ebe28c8d91eeea07b9598b",
  measurementId: "G-CR48HB0GG5"
};

const app = initializeApp(firebaseConfig);
// offline support
initializeFirestore(app, {
	localCache: persistentLocalCache({
		tabManager: persistentMultipleTabManager()
	})
})
// const analytics = getAnalytics(app);
export const db = getFirestore(app);