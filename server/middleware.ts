import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User, UserRequest} from './../imports/user'
import { ulid } from 'ulid';
import {UserCollection} from './collections'
import {Request, Response,NextFunction} from 'express'


const JWT_SECRET = 'your_jwt_secret_key';

export const createToken = (user: User): string => {
    const signedToken= jwt.sign({ _id: user._id, username: user.username, email:user.email, createdAt:user.createdAt}, JWT_SECRET, { expiresIn: '1h' });
        return signedToken
};

export const registerUser = async (user:UserRequest):Promise<User> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const newUser: User = { _id: ulid(), username:user.username, email:user.email, password: hashedPassword,createdAt:new Date().toISOString() };
        UserCollection.insert(newUser)
        return newUser;
};

export const authenticateUser = async (username: string, password: string): Promise<User | null> => {
    const user = UserCollection.findOne({username})
    if (user && await bcrypt.compare(password, user.password)) {
        return user;
        
    }else{
        return null;
    }
   
};

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try{
           const decoded= jwt.verify(token, JWT_SECRET) as User
            req.user = decoded
            next();
        }catch(err){
            res.status(403).send('Failed')
        }
    }
};