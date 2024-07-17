import Router from 'express'
const router = Router();
//import uploadFile from '../middleware/upload.middleware.js'
import {upload} from '../middleware/multer.middleware.js'
import verifyJWT from '../middleware/verifyJWT.js'
import {register, login, forgotUserPassword} from '../controllers/user.controller.js'
import {createPost, getAllPost, getPostById, updateCaptionOfPost, deletePost} from '../controllers/post.controller.js'
import {likePost, getAllLike} from '../controllers/like.controller.js'
import {createComment, getAllCommentsOnPost, getCommentById, updateComment, deleteComment} from '../controllers/comment.controller.js'
router.route('/signup').post(register)
router.route('/login').post(login)
router.route('/reset-password').post(forgotUserPassword)

//for post controller
router.route('/post').post(verifyJWT, upload.single('image'), createPost)
router.route('/update-post-caption/:id').put(verifyJWT, updateCaptionOfPost)
router.route('/get-all-post').get(verifyJWT, getAllPost)
router.route('/post/:id').get(verifyJWT, getPostById)
router.route('/delete-post/:id').delete(verifyJWT, deletePost)

//for comment controller
router.route('/add-comment/:id').post(verifyJWT, createComment)
router.route('/get-all-comment-on-post/:id').get(getAllCommentsOnPost)
router.route('/get-comment/:id').get(getCommentById)
router.route('/update-comment/:id').put(verifyJWT, updateComment)
router.route('/delete-comment/:id').delete(verifyJWT, deleteComment)

//for like controller
router.route('/like-post/:id').post(verifyJWT, likePost)
router.route('/post/get-all-like/:id').get(getAllLike)

    
    

export default router