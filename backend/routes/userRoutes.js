import express from 'express';
const userRoute = express.Router();
import { loginUser, registerUser, userProfile, updateProfile, updateProfilePicture } from "../controllers/userControllers.js";
// import {
//     createPost

// } from "../controllers/postControllers.js";
import {authGuard}  from '../middleware/authMiddleware.js';




userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.get('/profile', authGuard, userProfile);
userRoute.put('/updateProfile', authGuard, updateProfile);
userRoute.put('/updateProfilePicture', authGuard, updateProfilePicture)


//post controller routes

// userRoute.post('/createPost',authGuard, adminGuard, createPost);




export default userRoute;