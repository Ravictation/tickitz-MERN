import express from 'express'
import ctrl from '../controllers/genre.js'

const router = express.Router()

router.get('/', ctrl.getGenre)
router.post('/', ctrl.addGenre)


export default router