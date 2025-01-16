import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import songRouter from './src/routes/songRoute.js'
import connectDB from './src/config/mongoDB.js'
import connectCloudinary from './src/config/cloudinary.js'
import albumRouter from './src/routes/albumRoute.js'


// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// route initialisation
app.use("/api/song",songRouter);
app.use("/api/album",albumRouter)

app.get('/',(req,res)=>res.send("API working"))
app.listen(port,()=>console.log(`Server started on ${port}`))



