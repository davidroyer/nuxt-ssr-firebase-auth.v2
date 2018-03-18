const express = require('express')

const router = express.Router()

const app = express();

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.post('/login', (req, res) => {
  // console.log('[API] - LOGIN POST', req.headers, req.body.uid)
  console.log('REQ BODYYY: ', req.body);
  req.session.userId = req.body.uid
  res.cookie('access_token',req.body.token, { maxAge: 3600000, httpOnly: true }) /* 1 hour */
  return res.json( { status: 'success' })
})

router.post('/logout', (req, res) => {
  console.log('[API] - LOGOUT POST')
  delete req.session.userId
  res.clearCookie('access_token');
  return res.json({ status: 'success' })
})

module.exports = {
  path: '/api',
  handler: router
}
