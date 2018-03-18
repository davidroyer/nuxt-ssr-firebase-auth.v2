export default function ({ store, redirect }) {
  if (store.getters['modules/user/isAuthenticated']) {
    return redirect('/protected')
  }
}
