import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const  generateUserToken = (res,userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET_USER,{
        expiresIn:'30d'
    })

    res.cookie('jwt',token,{
         httpOnly:true,
         secure: process.env.NODE_ENV !== 'development',
         sameSite:'strict',
         maxAge:30 * 24 * 60 * 60 * 1000
    
        })
        return token;
}

export default generateUserToken;







