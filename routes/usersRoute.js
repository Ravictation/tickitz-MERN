import express from 'express'
import ctrl from '../controllers/user.js'

const router = express.Router()


router.post('/', ctrl.signUp)

export default router