import express from 'express'
const commentRoute = express.Router();

import {
    createComment,
    updateComment,
    deleteComment,
  
} from '../controllers/commentControllers.js'

import { authGuard, adminGuard } from '../middleware/authMiddleware.js';

commentRoute.post('/', authGuard, createComment)
commentRoute.route("/:commentId").put(authGuard, updateComment)
.delete(authGuard, deleteComment)

export default commentRoute;