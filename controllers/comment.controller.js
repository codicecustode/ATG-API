import Comment from '../models/comment.model.js'

export const createComment = async (req, res) => {
    const comment = new Comment({
        user: req.user._id,
        post: req.params.id,
        comment: req.body.comment
    })
    try {
        const savedComment = await comment.save();
        res.status(201).send(savedComment);
    } catch (error) {
        res.status(400).send(error);
    }
}

//update comment 
export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if(comment.user.toString() === req.user._id.toString()){
            await comment.updateOne({
                $set: req.body
            });
            res.status(200).send('Comment has been updated');
        } else {
            res.status(401).send('You can update only your comment');
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

//delete comment 
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if(comment.user.toString() === req.user._id.toString()){
            await comment.deleteOne();
            res.status(200).send('Comment has been deleted');
        } else {
            res.status(401).send('You can delete only your comment');
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

