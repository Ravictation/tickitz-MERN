import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import  Jwt  from "jsonwebtoken";


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = mongoose.Schema(
    {
        username: {
            type: String, 
            trim: true,
            required: [true, 'Insert username'],
            unique:true,
            maxlength: 32,
            minlength:6
        },
        email: {
            type: String,
            trim: true,
            required: (true, 'insert email'),
            unique: true,
            validate : [validateEmail, 'please fill a valid email'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password : {
            type: String,
            trim: true,
            required: [true, 'insert password'],
            minlength: [6, 'password must have at least six character'],
       
        },
        role: {
            type: String,
            default: "user",

        },
        verified: {
            type: Boolean,
            default: false
        }

    }, {timestamps: true}
)

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.comparePassword = async function(yourPassword){
    return await bcrypt.compare(yourPassword, this.password)
}

userSchema.methods.jwtGenerateToken = function () {
    return Jwt.sign({
        id: this.id,
        role : this.role,
        username: this.username
    }, process.env.JWT_SECRET, {
        expiresIn: 3600
    })
}




const User = mongoose.model("User", userSchema)

export default User