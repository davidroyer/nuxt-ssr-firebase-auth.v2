import firebaseApp from '~/firebase/app'

export const state = () => ({
  uid: null,
  user: null
})

export const getters = {

  uid(state) {
    if (state.user && state.user.uid) return state.user.uid
    else return null
  },

  user(state) {
    return state.user
  },

  isAuthenticated(state) {
    return !!state.user && !!state.user.uid
  }
}

export const actions = {

  async login({dispatch, state}, user) {
    console.log('[STORE ACTIONS] - login')

    const token = await firebaseApp.auth().currentUser.getIdToken(true)
    const {status} = await this.$axios.$post('/api/login', { uid: user.uid, token: token })

    const userInfo = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid
    }

    await dispatch('setUSER', userInfo)
    // await dispatch('saveUID', userInfo.uid)
    console.log('[STORE ACTIONS] - in login, response:', status)

  },

  async logout({dispatch}) {
    console.log('[STORE ACTIONS] - logout')
    await firebaseApp.auth().signOut()

    // await dispatch('saveUID', null)
    await dispatch('setUSER', null)

    const {status} = await this.$axios.post('/api/logout')
    console.log('[STORE ACTIONS] - in logout, response:', status)
  },

  saveUID({commit}, uid) {
    console.log('[STORE ACTIONS] - saveUID')
    commit('saveUID', uid)
  },

  setUSER({commit}, user) {
    commit('setUSER', user)
    commit('saveUID', user.uid)
  }

}

export const mutations = {
  saveUID (state, uid) {
    console.log('[STORE MUTATIONS] - saveUID:', uid)
    state.uid = uid
  },
  setUSER (state, user) {
    const {name, email, uid, avatar} = user
    console.log('[STORE MUTATIONS] - setUSER:', user)
    state.user = user
  }
}
