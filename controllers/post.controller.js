import Post from '../models/post.model.js'
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
        res.status(201).json({message:'post created succcessful', createdPost});
    } catch (error) {
        res.status(400).send(error);
    }
}

//get all the post
const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username');
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send(error);
    }
}

//get post by id
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'username');
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send(error);
    }
}

//update the post
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.user.toString() === req.user._id.toString()){
            await post.updateOne({
                $set: req.body
            });
            res.status(200).send('Post has been updated');
        } else {
            res.status(401).send('You can update only your post');
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

//delete the post and delete related comment and like
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.user.toString() === req.user._id.toString()){
            await post.deleteOne();
            res.status(200).send('Post has been deleted');
        } else {
            res.status(401).send('You can delete only your post');
        }
    } catch (error) {
        res.status(400).send(error);
    }
}


export{
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost
}

