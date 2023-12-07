import Comment from "../models/Comment.js";
import Post from '../models/Post.js'

export const createComment = async (req, res, next) => {
    try {
        const {desc, slug, parent, replyOnUser} = req.body;

        const post = await Post.findOne({ slug: slug});

        if(!post) {
            const error = new Error('Post was not found')
            return next(error);
        }

        const newComment = new Comment({
            user: req.user._id,
            desc,
            post: post._id,
            parent,
            replyOnUser,
        });

        const savedComment = await newComment.save();
        res.json(savedComment)


        
    } catch (error) {
        next(error)
        
    }
}
export const updateComment = async (req, res, next) => {
    try {
        const { desc } = req.body;

        const comment = await Comment.findById(req.params.commentId)

       
        if(!comment) {
            const error = new Error('Comment was not found')
            return next(error);
        }

       comment.desc = desc || comment.desc

       const updatedComment = await comment.save()

       return res.json(updatedComment)


        
    } catch (error) {
        next(error)
        
    }
}

export const deleteComment = async (req, res, next) => {
    try {
       

        const comment = await Comment.findByIdAndDelete(req.params.commentId);

        await Comment.deleteMany({parent: comment._id})

       
        if(!comment) {
            const error = new Error('Comment was not found')
            return next(error);
        }

       return res.json({
        message: 'Comment deleted successfully'
       })


        
    } catch (error) {
        next(error)
        
    }
}