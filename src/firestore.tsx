import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
	apiKey: 'AIzaSyBilywJyGpUzyU6KBugklJzlRXEPMRpSC4',
	authDomain: 'take-home-50161.firebaseapp.com',
	projectId: 'take-home-50161',
	storageBucket: 'take-home-50161.appspot.com',
	messagingSenderId: '1034979312522',
	appId: '1:1034979312522:web:258c4ccea1d935658bbe73',
	measurementId: 'G-LPZCTQ5YZN',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
