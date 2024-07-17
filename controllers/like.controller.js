import Like from '../models/like.model.js'

export const likePost = async (req, res) => {
    const like = new Like({
        user: req.user._id,
        post: req.params.id
    })
    try {
        const savedLike = await like.save();
        res.status(201).send(savedLike);
    } catch (error) {
        res.status(400).send(error);
    }
}

//get all the like
export const getAllLike = async (req, res) => {
    try {
        const likes = await Like.find().populate('user', 'username');
        res.status(200).send(likes);
    } catch (error) {
        res.status(400).send(error);
    }
}

//get like by id
export const getLikeById = async (req, res) => {
    try {
        const like = await Like.findById(req.params.id).populate('user', 'username');
        res.status(200).send(like);
    } catch (error) {
        res.status(400).send(error);
    }
}

//delet like
export const deleteLike = async (req, res) => {
    try {
        const like = await Like.findById(req.params.id);
        if(like.user.toString() === req.user._id.toString()){
            await like.deleteOne();
            res.status(200).send('Like has been deleted');
        } else {
            res.status(401).send('You can delete only your like');
        }
    } catch (error) {
        res.status(400).send(error);
    }
}


