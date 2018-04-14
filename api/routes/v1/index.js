import express from 'express'

const router = express.Router()

router.all('/', (req, res, next) => {
    return res.json({ status: 'online' })
})

export default { router, security: 0 }
