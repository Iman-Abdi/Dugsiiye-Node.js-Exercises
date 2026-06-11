const mongoose = require('mongoose')
const express = require('express')
const app = express();
require('dotenv').config()
PORT = process.env.PORT;
const bookroutes = require("./routes/books");


app.use(express.json());

app.use("/books" , bookroutes)


mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("✅ connected to MongoDB"))
    .catch((err)=>console.log("❌ connection failed"))

app.listen(PORT,()=>{
    console.log(`connected to the server http://localhost:${PORT}`)
})
