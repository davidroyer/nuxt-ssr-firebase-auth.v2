
export default function ({ store, redirect }) {
  console.log('[AUTHENTICATED] - middleware')

  if (!store.getters['modules/user/isAuthenticated']) {
    console.log('User is not authenticated redirecting to signin')
    return redirect('/auth/signin')
  }
}
