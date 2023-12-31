import jwt from 'jsonwebtoken'
import resp from '../library/responses.js'

const middleware = (...role) => {
    return (req, res, next) => {
        const { authorization } = req.headers

        if (!authorization) {
            return resp(res, 401, 'please login first.')
        }

        const token = authorization.replace('Bearer ', '')
        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decode) => {
            if (err) {
                return resp(res, 401, err.message)
            }
            console.log(decode.role)
            if (role.includes(decode.role) == false) return resp(res, 401, "you don't have access.")
            req.data_jwt = decode.data
            return next()
        })
    }
}
export default middleware