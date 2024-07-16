import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    image:{
        type: String,
        required: true
    },
    caption:{
        type: String,
        required: true,
        trim: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
    },{timestamps:true})
// create model
const Post = mongoose.model('Post', postSchema)
export default Post
