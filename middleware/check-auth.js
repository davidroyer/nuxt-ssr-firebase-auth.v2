import jwtDecode from 'jwt-decode'
var cookieparser = require('cookieparser')

export default function ({store, req}) {
  if (process.server && !store.getters['modules/user/isAuthenticated']) {
    let uid = getUserFromSession(req)

    const user = getUserFromCookie(req)
    if (user) {
      store.dispatch('modules/user/saveUSER', {name: user.name, email: user.email, avatar: user.picture, uid: user.user_id})
      store.dispatch('modules/user/saveUID', user.user_id)
    }
  }
}

function getUserFromCookie (req) {
  if (!req.headers.cookie) return

  if (req.headers.cookie) {
    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsed.access_token
    if (!accessTokenCookie) return

    const decodedToken = jwtDecode(accessTokenCookie)
    if (!decodedToken) return

    return decodedToken
  }
}

function getUserFromSession (req) {
  console.log('[CHECK-AUTH] - checking if user is stored in session')
  return req.session ? req.session.userId : null
}
