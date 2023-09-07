import express from 'express'
import ctrl from '../controllers/genre.js'

const router = express.Router()

router.post('/', ctrl.addGenre)


export default router