import jwt  from "jsonwebtoken"
import User from '../models/userModel.js'

const genToken = async (username) => {
    try {
    const user = await User.findOne({username})
    const payload = {
        id: user._id,
        username: user.username,
        role: user.role,
    }
    console.log(payload)
    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME })
   
    // const refresh_token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY_REFRESH, { expiresIn: process.env.JWT_EXPIRE_TIME_REFRESH })
    return  token
    } catch (error) {
        console.log(error.message)
        return response(res,500, error.message)
    }
    
}

export default genToken;