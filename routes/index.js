import User from './usersRoute.js'
import Movie from './moviesRoute.js'
import Genre from './genreRoute.js'
import Cast from './castRoute.js'
import express from 'express'


const route = express.Router()

route.use('/user', User)
route.use('/movie', Movie)
route.use('/genre', Genre)
route.use('/cast', Cast)


export default route