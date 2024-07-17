import Like from '../models/like.model.js'
import Post from '../models/post.model.js'

export const likePost = async (req, res) => {
    const postId = req.params.id;

    if (!postId) {
        return res.status(404).send('Post not found');
    }

    try {
        // Check if the user has already liked the post
        const existingLike = await Like.findOne({ user: req.user._id, post: postId });

        if (existingLike) {
            return res.status(400).json({ message: 'User has already liked this post' });
        }

        // Create a new Like document
        const like = new Like({
            user: req.user._id,
            post: postId
        });

        // Save the new Like document
        const savedLike = await like.save();

        // Update the Post document to include the new Like
        console.log("kk")
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { likes: savedLike._id } }, // Add the like ID to the 'likes' array
            { new: true } // Return the updated post document
        ).populate('likes'); // Populate the 'likes' field in the updated post
console.log("kk")
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(201).json({
            message: 'Post liked successfully',
            savedLike,
            updatedPost
        });
    } catch (error) {
        res.status(400).send(error);
    }
};
//get all the like on a single post
export const getAllLike = async (req, res) => {
    try {
        const postId = req.params.id;

        if(!postId){
            return res.status(404).send('Post not found');
        }
        const likes = await Like.find({ post: postId }).populate('user', 'username');
        res.status(200).send(likes);
    } catch (error) {
        res.status(400).send(error);
    }
}

//delete like
// export const deleteLike = async (req, res) => {
//     try {
//         const like = await Like.findById(req.params.id);
//         if(like.user.toString() === req.user._id.toString()){
//             await like.deleteOne();
//             res.status(200).send('Like has been deleted');
//         } else {
//             res.status(401).send('You can delete only your like');
//         }
//     } catch (error) {
//         res.status(400).send(error);
//     }
// }


