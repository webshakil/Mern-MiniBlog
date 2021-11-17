import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
const __dirname = path.resolve();

const app = express();
dotenv.config();

if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

//For deployment
if ( process.env.NODE_ENV == "production"){
 
  app.use(express.static(path.join(__dirname,"/client/build")));

  app.get("*", (req, res) => {

      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
  }else{
      app.get("/", (req, res) => {
          res.send("Api is Running");
      });
  }


app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

app.get('/posts',(req,res)=>{
  res.send('Hello to Blog API');
})

//const CONNECTION_URL = 'mongodb://localhost:27017/memories';
const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);