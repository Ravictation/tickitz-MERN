import express from 'express'
import ctrl from '../controllers/user.js'

const router = express.Router()


router.post('/register', ctrl.signUp)
router.post('/login', ctrl.signIn)
router.get('/verification',ctrl.verification)
router.get('/:id', ctrl.getUserId)

export default router