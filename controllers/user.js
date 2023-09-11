import User from '../models/userModel.js'
import UserVerification from '../models/userVerificationModel.js'
import nodemailer from 'nodemailer'
import { v4 as uuidv4  } from 'uuid'
import bcrypt from 'bcrypt'
import { google } from 'googleapis'
import jwt from 'jsonwebtoken'
import url from 'url'

const ctrl = {}
const sendVerificationEmail = (email, subject, text) => {
    const oauth2Client = new google.auth.OAuth2(
        '549759556570-fuh9gnagq1vq70h7eqidqtuailpj9jf9.apps.googleusercontent.com',
        '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',
        'https://developers.google.com/oauthplayground'
      );
      
      oauth2Client.setCredentials({
        refresh_token: '1//04-qiyfTi3ehbCgYIARAAGAQSNwF-L9IrROinh0APNXDasIg_h7qBXd1c7wbZUrOfcx0TPEcCmZwNSh16JWQRfZQi-dPM9Jwo6fU'
      });
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'adjiedewantara24@gmail.com',
          clientId: '549759556570-fuh9gnagq1vq70h7eqidqtuailpj9jf9.apps.googleusercontent.com',
          clientSecret: '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',
          refreshToken: '1//04-qiyfTi3ehbCgYIARAAGAQSNwF-L9IrROinh0APNXDasIg_h7qBXd1c7wbZUrOfcx0TPEcCmZwNSh16JWQRfZQi-dPM9Jwo6fU',
          accessToken: oauth2Client.getAccessToken()
        }
      });
    transporter.verify((error,success)=>{
        if(error){
            console.log(error)
    
        } else {
            console.log("ready for message")
            console.log(success)
        }
    })
    
    const mailOptions = {
                    from: 'adjiedewantara24@gmail.com',
                    to: email, 
                    subject: subject,
                    text: text
                };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
}



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
    const subject = 'tickitz verification'
    const verification_token = jwt(email).token
    const text = `http://localhost:5555/verification?token=${verification_token}`
    sendVerificationEmail(email, subject, text)
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
        
        if(!user){
            return res.status(400).json({
                message: "invalid username"
            })
        }
        if(!user.verified){
            return res.status(401).json({
                message: "account is not verified, check your email"
            })
        }
        const verifyPassword = await user.comparePassword(password)
        if (!verifyPassword){
            return res.status(400).json({
                message: "invalid password"
            })
        }
        
        const token = await user.jwtGenerateToken()
        res.status(200).json({
            message:"login success",
            token
        })
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            message: "cannot log in"
        })
    }
}

ctrl.verification = async (req,res) =>{
    try {
       const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        

        const parsedUrl = url.parse(fullUrl, true);
        const tokens = parsedUrl.query.token;
        console.log(tokens)
        jwt.verify(tokens, process.env.JWT_PRIVATE_KEY, async (err, decode) => {
            if (err) {
                throw err.message;
            }
            const email = decode.data;
            console.log(decode);
    

            const result = await User.findOneAndUpdate(
                { email: email },
                { verified: true },
                { new: true }
            );
    

            console.log(result);
            return res.status(200).json({
                message: "account has been verified"
            })
    

        });
            } catch (error) {
                console.log(error)
                return res.status(400).json({
                    message: "cannot verify email"
                })
            }
       
        }

export default ctrl