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

export const forgotUserPassword = async(req, res)=>{
    const { username, email, newpassword} = req.body
    //username and newpassword and email is empty
    if((!username && !email) || !newpassword){
        return res.status(400).send({message: "All fields are required"})
    }
    //check email regex
    if(!emailRegex.test(email) && email){
        return res.status(400).send({message: "Invalid email"})
    }
    
    try {
            const user = await User.findOne({
                $or:[{username},{email}]
            })
            .exec()
            if(!user){
                return res.status(400).send({message: "Invalid username or email"})
            }
           //check newpassword is same as before or not
            if(await bcrypt.compare(newpassword, user.password)){
                return res.status(400).send({message: "New password cannot be the same as the old password"})
            }
            const hashedPassword = await bcrypt.hash(newpassword, 10)
            await User.findByIdAndUpdate(user._id, 
                {
                    password: hashedPassword
                });
            
            res.status(200).send({message: "Password reset successful"})
        } catch (error) {   
            res.status(400).send({message: error.message})
        }
}



        
