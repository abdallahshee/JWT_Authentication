import express, {Router,Request,Response} from 'express'
import { authenticateJWT, authenticateUser, createToken, registerUser } from '../middleware';
import { User, UserRequest } from '/imports/user';
import { ulid } from 'ulid';

export const accountRouter=Router()

accountRouter.post('/register', async (req: Request, res: Response) => {
    console.log('METHOD HIT')
    const request :UserRequest= req.body;
    const newUser:User={
        _id:ulid(),
        createdAt:new Date().toDateString(),
        ...request
    }
    console.log(newUser)
    const user = await registerUser(newUser);
    const token = createToken(user);
    res.json({ token });
});

accountRouter.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await authenticateUser(username, password);
    if (user) {
        const token = createToken(user);
        res.json({ token });
    } else {
        res.status(401).send('Invalid username or password');
    }
});

accountRouter.get('/books', authenticateJWT, async (req: Request, res: Response) => {

});

accountRouter.get('/protected', authenticateJWT, (req: Request, res: Response) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

