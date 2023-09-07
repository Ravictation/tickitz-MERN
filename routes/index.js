import User from './usersRoute.js'
import express from 'express'


const route = express.Router()

route.use('/user', User)


export default route