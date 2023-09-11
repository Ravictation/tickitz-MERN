import express from "express"
import ctrl from "../controllers/movie.js"
import authCheck from '../middleware/authCheck.js'

const router = express.Router()



router.post('/',authCheck('user'), ctrl.addMovie)
router.get('/', ctrl.getMovie)
router.put('/:id', ctrl.updateMovie)
router.delete('/:id', ctrl.deleteMovie)
router.get('/:id', ctrl.getMovieById)

export default router