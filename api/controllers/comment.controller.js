import { errorHandler } from "../utils/error.js";
import Comment from '../models/comment.model.js'


export const createComment = async (req, res, next) => {
 

  try {
    const { content, postId, userId } = req.body;

    // Validate required fields
    if (!postId || !content || !userId) {
      return next(errorHandler(400, 'Missing required fields (postId, content, userId)'));
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    const comment = await newComment.save();
    res.status(201).json(comment); // Respond with 201 Created on success
  } catch (error) {
    console.error('Error creating comment:', error);
    next(error); // Pass the error to the error-handling middleware
  }
};




