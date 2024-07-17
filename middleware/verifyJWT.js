import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
 const verifyJWT = async (req, res, next) => {
    
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    
    if(!token){
        return res.status(401).send('Access Denied');
    }
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(decodedToken.id)
        req.user = user;
        console.log("token verified..")
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}

export default verifyJWT
