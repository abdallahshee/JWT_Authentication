import express, { Request,Response } from 'express'
import cors from 'cors'
import {accountRouter} from './controllers/account'

export const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(accountRouter)

app.get('/',(req:Request, res:Response)=>{
    res.send({name:'Testing the app'})
})

