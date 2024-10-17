// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from "./app.js"
dotenv.config({
    path: './.env'
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection is failed !!! ", err);
})

//function connectDB(){

//}
/*
import express from "express";

const app = express()
(async () => {
    try {

       mongoose.connect(`${processs.env.MONGODB_URI}/${BD_NAME}`)

       app.on("error",(error)=>{

        console.log("Error:",error)
        throw error
       })

       app.listen(processs.env.PORT,()=>{
        console.log(`App is listening on port ${processs.env.PORT}`)
       })
    }
    catch(error){
        console.error("Error :"  ,error)
        throw err
    }
})


*/





