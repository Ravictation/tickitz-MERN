import User from '../models/userModel.js'

const ctrl = {}

ctrl.signUp = async (req,res) => {
    const { email } = req.body
    const userExist = await User.findOne({email})
    if (userExist){
        return res.status(400).json({
            success:false,
            message: "email already registered"
        })
    }
    try {
        if ( !req.body.username||
        !req.body.email||
        !req.body.password
    ) {
        return res.status(400).send({
            message: 'input all field username, email, password'
        })

    }
    const newUser = {
        username:   req.body.username,
        email:      req.body.email,
        password:   req.body.password,
        role:       req.body.role,
    }
    const user = await User.create(newUser) 
    return res.status(201).json({
        success: true,
        message: "success create user",
        user
    })
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({message: error.message})
        
    }
}

ctrl.signIn= async (req,res) =>{
    try {
        const {username, password} = req.body
        if(!username || !password){
            return res.status(400).json({
                message: "email and password are required"
            })
        }
        const user = await User.findOne({username})
        console.log(user)
        if(!user){
            return res.status(400).json({
                message: "invalid username"
            })
        }
        const verifyPassword = await user.comparePassword(password)
        if (!verifyPassword){
            return res.status(400).json({
                message: "invalid password"
            })
        }
        res.status(200).json({
            message:"login success",
            user
        })
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            message: "cannot log in"
        })
    }
}


export default ctrl