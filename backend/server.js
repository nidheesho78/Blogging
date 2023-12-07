import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser';
import path from 'path';
import { errorHandler, invalidPathHandler } from './middleware/errorHandler.js';
import cors from 'cors';
//Routes
import userRoute from './routes/userRoutes.js';
import postRoute from './routes/postRoutes.js';
import commentRoute from './routes/commentRoutes.js'


dotenv.config();
connectDB();
// const corsOptions = { 
//     origin:true,
//     credentials:true
//  }
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors());
app.get('/',(req,res) => {
    res.send('Server is running...');
})

app.use('/api/users',userRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

//static assets

const uploadsPath = path.join(process.cwd(), 'uploads');

app.use('/uploads', express.static(uploadsPath));


app.use(invalidPathHandler)
app.use(errorHandler)
const PORT = process.env.PORT || 5000;
console.log(process.env.PORT)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)) 