import express from 'express'
const postRoute = express.Router();


import {
    createPost,
    deletePost,
    getPost,
    updatePost,
    getAllPosts
} from '../controllers/postControllers.js'

import { authGuard, adminGuard } from '../middleware/authMiddleware.js';


postRoute.route("/").post(authGuard, adminGuard, createPost).get(getAllPosts)
postRoute.route("/:slug").put(authGuard, adminGuard, updatePost).delete(authGuard, adminGuard, deletePost).get(getPost)
  

export default postRoute;