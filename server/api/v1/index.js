import express from 'express'

const router = express.Router()

router.all('/', (req, res, next) => {
  return res.send('ALL OK')
})

module.exports = router
