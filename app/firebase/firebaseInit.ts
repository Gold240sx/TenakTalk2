import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
	type User,
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "firebase/auth"
import {
	getFirestore,
	serverTimestamp,
	doc,
	setDoc,
	getDoc,
	onSnapshot,
	updateDoc,
	collection,
	addDoc,
	getDocs,
	deleteDoc,
	type DocumentData,
	type Firestore,
} from "firebase/firestore"
import {
	getStorage,
	ref,
	uploadString,
	uploadBytes,
	getDownloadURL,
} from "firebase/storage"

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
//init firestore
const db = getFirestore(app)
// init firebase auth
const auth = getAuth(app)
// init storage
const storage = getStorage(app)
// Timestamp
const timestamp = serverTimestamp()
// Analytics
const analytics = () => {
	if (getAnalytics) {
		const analytics = getAnalytics(app)
		// Your analytics initialization code here
		return analytics
	} else {
		console.warn("Firebase Analytics is not supported in this environment.")
	}
}

export {
	db,
	auth,
	User,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	serverTimestamp,
	signOut,
	doc,
	setDoc,
	getDoc,
	getDocs,
	addDoc,
	deleteDoc,
	onSnapshot,
	updateDoc,
	uploadBytes,
	collection,
	storage,
	timestamp,
	analytics,
	ref,
	uploadString,
	getDownloadURL,
	type DocumentData,
	type Firestore,
}
