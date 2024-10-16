import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config(); 

const Mongo_url = process.env.mongo_url;
mongoose.connect(Mongo_url)
.then(()=>{
    console.log('mongo db connected')
}).catch((err)=>{
    console.log('error in db connection', err)
})

