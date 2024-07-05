import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/router.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/', router());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../client/src')));

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("Connected succesfully");
});
mongoose.connection.on('error', (error)=>{
    console.log(error);
})

app.listen(PORT, ()=>{
    console.log('Server is running');
});


