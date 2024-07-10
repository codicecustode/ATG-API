//write rejistering code for user
 import User from '../models/user.model'
 import jwt from 'jsonwebtoken'
 import bcrypt from 'bcrypt'
 export const register = async (req, res) => {
    try {
        const{username, password, email} = req.body;
        const isEmailExist = User.findOne(username);
        if(isEmailExist){
            return res.status(400).send({message: "Email already exists"});
        }
        const isUserNameExist = User.findOne(username);
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
            username: user.username, id:
            user._id
            }, process.env.TOKEN_SECRET
        )
        res.status(201).send(user)
    } catch (error) {
        res.status(400)
        .send({ message: error.message })
    }
}

//write login code for user
export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User
        .findOne({username})
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

        res.header('auth-token', token).json({token, username, email}) 
    }
    catch (error) {
        res.status(400)
        .send({ message: error.message })
    }
}


        