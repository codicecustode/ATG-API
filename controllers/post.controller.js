import Post from '../models/post.model.js'
import Comment from '../models/comment.model.js'
import Like from '../models/like.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'

const createPost = async (req, res, next) => {
    const {caption} = req.body;

   console.log(req.file.path)
   const postPath = req.file?.path ;
    if(!postPath) {
        return res.status(400).json({message:'post not found'})
    }
    const response = await uploadOnCloudinary(postPath);
    console.log(req.user._id)
    const imgUrl = response.secure_url;
    const post = new Post({
        image:imgUrl,
        caption,
        user: req.user._id
    })
    try {
        const savedPost = await post.save();
        const {user, image, caption, likes, comments, createdAt} = savedPost
        const createdPost = { user, image, caption, likes, comments, createdAt}
        res.status(201).json({message:'post created succcessful', savedPost});
    } catch (error) {
        res.status(400).send(error);
    }
}

//get all the post of a user 
const getAllPost = async (req, res) => {
    try {
        const userId = req.user._id;
        const posts = await Post.find({ user: userId }).populate('user', 'username');
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send(error);
    }
}

//get post by id
// Example of getPostById controller function
const getPostById = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const {user, image, caption, likes, comments, createdAt} = post
        const postDetails = { user, image, caption, likes, comments, createdAt}

        // Send the post data in the response
        res.json({ postDetails });
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//update the post
const updateCaptionOfPost = async (req, res) => {
    try {
        const { newUpdatedCaption } = req.body;
        const postId = req.params.id;
        
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        if (post.user.toString() === req.user._id.toString()) {
            const updatedPost = await Post.findByIdAndUpdate(
                postId,
                { $set: { caption: newUpdatedCaption } },
                { new: true }
            );

            res.status(200).json({
                message: 'Post updated successfully',
                updatedPost
            });
        } else {
            res.status(401).json({ message: 'You can update only your post' });
        }
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(400).json({ message: 'Error updating post', error });
    }
};

//delete the post and delete related comment and like
const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({ message: 'Post not found' });
        }
        
        if(post.user.toString() === req.user._id.toString()){
            
            await Comment.deleteMany({ post: postId });
            await Like.deleteMany({ post: postId });

            await post.deleteOne();
            res.status(200).json({
                message: 'Post has been deleted and associated like and comment also deleted'
            })
        } else {
            res.status(401).json({
                message: 'You can delete only your post'
            })
        }
    } catch (error) {
        res.status(400).send(error);
    }
}


export{
    createPost,
    getAllPost,
    getPostById,
    updateCaptionOfPost,
    deletePost
}

