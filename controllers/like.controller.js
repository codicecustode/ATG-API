import Like from '../models/like.model.js'

export const likePost = async (req, res) => {
    const postId = req.params.id;

    if(!postId){
        return res.status(404).send('Post not found');
    }

    const like = new Like({
        user: req.user._id,
        post: postId
    })
    try {
        const savedLike = await like.save();
        res.status(201).json({
            message: 'Post liked successfully',
            savedLike
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

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


