import firebase from 'firebase'
import env from 'config'

// uncomment the below if you use firestore DB instead of firebase DB
// require('firebase/firestore')

const config = {
  apiKey: env.FIREBASE.API_KEY,
  authDomain: `${env.FIREBASE.PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${env.FIREBASE.DATABASE_NAME}.firebaseio.com`,
  projectId: env.FIREBASE.PROJECT_ID,
  storageBucket: `${env.FIREBASE.PROJECT_ID}.appspot.com`,
  messagingSenderId: env.FIREBASE.SENDER_ID
}
const googleProvider = new firebase.auth.GoogleAuthProvider()

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
export {googleProvider}
