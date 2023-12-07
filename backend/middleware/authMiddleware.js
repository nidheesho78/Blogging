import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../models/User.js";
dotenv.config();


export const authGuard = async (req, res, next) => {
  let token;
  // Extract token from Authorization header
  if (req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    token = req.cookies.jwt;
  }

  if (!token) {
    const error = new Error('Not authorized, No token');
    error.statusCode = 401;
    next(error);
    return;
  }

  // Verify the token using JWT
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_USER);
    req.user = await User.findById(userId).select('-password');
    next();
  } catch (error) {
    const err = new Error('Not authorized, Token Failed');
    err.statusCode = 401;
    next(err);
  }
};

export const adminGuard = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    next()
  } else {
    let error = new Error("Not authorized as an admin")
    error.statusCode = 401
    next(error) 
  }
}

