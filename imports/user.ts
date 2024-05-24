export interface User{
    _id:string,
    username:string,
    email:string
    password:string
    createdAt:string
}

export interface UserRequest{
    username:string,
    email:string
    password:string,
}

declare module 'express' {
    interface Request {
        user?: User; // Add the user property
    }
}
