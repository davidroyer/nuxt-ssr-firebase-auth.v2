import firebaseApp from '~/firebase/app.js'

export default function ({store}) {
  firebaseApp.auth().onAuthStateChanged((user) => {
    console.log('[AUTH PLUGIN] onAuthStateChanged:', user)
    if (user) {
      //store.commit('saveUID', user.uid)
    }
  })
}
