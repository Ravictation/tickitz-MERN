import express from 'express'
import ctrl from '../controllers/cast.js'

const router = express.Router()

router.post('/', ctrl.addCast)
router.get('/', ctrl.getCast)

export default router