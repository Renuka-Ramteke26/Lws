import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connect } from 'mongoose'
import connectDB from './configs/mongodb.js'

//initialize Express
const app=express()

//connect to DB
await connectDB()

//Middlewares
app.use(cors())


//routes
app.get('/' , (req ,res)=> req.send("API Working"))

//port
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is runnig on port ${PORT}`)
})