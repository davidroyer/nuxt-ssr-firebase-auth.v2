import firebaseApp from '~/firebase/app'

export const state = () => ({
  uid: null,
  user: null
})

export const getters = {

  uid(state) {
    return state.uid
  },

  user(state) {
    return state.user
  },

  isAuthenticated(state) {
    return !!state.uid
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

    await dispatch('saveUSER', userInfo)
    await dispatch('saveUID', userInfo.uid)
    console.log('[STORE ACTIONS] - in login, response:', status)

  },

  async logout({dispatch}) {
    console.log('[STORE ACTIONS] - logout')
    await firebaseApp.auth().signOut()

    await dispatch('saveUID', null)
    await dispatch('saveUSER', null)

    const {status} = await this.$axios.post('/api/logout')
    console.log('[STORE ACTIONS] - in logout, response:', status)
  },

  saveUID({commit}, uid) {
    console.log('[STORE ACTIONS] - saveUID')
    commit('saveUID', uid)
  },

  saveUSER({commit}, user) {
    console.log('[STORE ACTIONS] - saveUSER')
    commit('saveUSER', user)
  }

}

export const mutations = {
  saveUID (state, uid) {
    console.log('[STORE MUTATIONS] - saveUID:', uid)
    state.uid = uid
  },
  saveUSER (state, user) {
    console.log('[STORE MUTATIONS] - saveUSER:', user)
    state.user = user
  }
}
