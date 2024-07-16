import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required:true
    },
    comment:{
        type: String,
        required: true,
        trim: true
    }
    },{timestamps:true})
// create model
const Comment = mongoose.model('Comment', commentSchema)
export default Comment

