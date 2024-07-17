import Comment from '../models/comment.model.js'
import Post from '../models/post.model.js'

export const createComment = async (req, res) => {
    const postId = req.params.id
    const comment = new Comment({
        user: req.user._id,
        post: postId,
        comment: req.body.comment
    })
    console.log(comment.user)
    try {
        const newAddedComment = await comment.save(); 
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: newAddedComment._id } }, // Add the comment ID to the 'comments' array
            { new: true } // Return the updated post document
        ).populate('comments'); // Populate the 'comments' field in the updated post
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(201).json({
            message: 'Comment added successfully',
            comment: newAddedComment,
            updatedPost
        });
        
    } catch (error) {
        res.status(400).send(error);
    }
}

//get all comments on a post
export const getAllCommentsOnPost = async (req, res) => {
    try {
        const postId = req.params.id;

        if(!postId){
            return res.status(404).send('Post not found')
        }

        const comments = await Comment.find({ post: postId }).populate('user', 'username');
        res.status(200).send(comments);
    } catch (error) {
        res.status(400).send(error);
    }
}

//get comment by id
export const getCommentById = async (req, res) => {
    const commentId = req.params.id;

    try {
        const comment = await Comment.findById(commentId)

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const {user, post, comment: text, createdAt} = comment
        const commentDetails = { user, post, text, createdAt}

        // Send the comment data in the response
        res.json({ commentDetails });
    } catch (error) {
        res.status(400).send(error);
    }
}


//update comment 
export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the comment belongs to the user
        if (comment.user.toString() === req.user._id.toString()) {
            const updatedComment = await Comment.findByIdAndUpdate(
                req.params.id,
                { $set: { comment: req.body.editedComment } },
                { new: true }  // Return the updated document
            );

            if (!updatedComment) {
                return res.status(500).json({ message: 'Failed to update comment' });
            }

            return res.status(200).json({
                message: 'Comment updated successfully',
                updatedComment
            });
        } else {
            return res.status(401).json({ message: 'You can update only your comment' });
        }
    } catch (error) {
        console.error('Error updating comment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//delete comment 
export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const postId = comment.post;

        if(comment.user.toString() === req.user._id.toString()){
            //remove comment from post
            const post = await Post.findById(postId);

            await comment.deleteOne();

            //delete the comment from post array in post schema
            const updatedPost = await Post.findByIdAndUpdate(
                postId,
                { $pull: { comments: commentId } },
                { new: true }
            )
            res.status(200).json({
                message: 'Comment deleted successfully',
                updatedPost
            });
        } else {
            res.status(401).send('You can delete only your comment');
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

