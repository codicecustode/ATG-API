import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const emailRegex = /^([^\s@]+@[^\s@]+\.[^\s@]+)$/;

 export const register = async (req, res) => {
    try {
        const{username, password, email} = req.body;

        if(!username || !password || !email){
            return res.status(400).send({message: "All fields are required"});
        }

        if(!emailRegex.test(email)){
            return res.status(400).send({message: "Invalid email"});
        }

        const isEmailExist = await User.findOne({email});
        
        if(isEmailExist){
            return res.status(400).send({message: "Email already exists"});
        }
        const isUserNameExist = await User.findOne({username});
        if(isUserNameExist){
            return res.status(400).send({message: "Usename already exists"});
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password:hashedPassword,
            email
        })
        await user.save()
        //generate token
        const token = jwt.sign({
            username: user.username, 
            id:user._id
            }, process.env.TOKEN_SECRET
        )
        res.status(201).json({user, token})
    } catch (error) {
        res.status(400)
        .send({ message: error.message })
    }
}

//write login code for user
export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        
        if(!user){
            return res.status(400).send({message: "Username does not exist"});
        }
        const {email} = user;
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).send({message: "Invalid password"});
        }
        //generate token
        const token = jwt.sign({
            username: user.username, id:
            user._id
            }, process.env.TOKEN_SECRET
        )

        res.header('auth-token', token).json({message:"user login successful",token, username, email}) 
    }
    catch (error) {
        res.status(400)
        .send({ message: error.message })
    }
}