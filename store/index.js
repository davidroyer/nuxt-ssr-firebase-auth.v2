import {getUserFromCookie, getUserFromSession} from '@/helpers'

export const actions = {

  async nuxtServerInit ({ dispatch }, { req }) {
    const user = getUserFromCookie(req)
    if (user) {
      await dispatch('modules/user/saveUSER', {name: user.name, email: user.email, avatar: user.picture, uid: user.user_id})
      await dispatch('modules/user/saveUID', user.user_id)
    }
  }
}
