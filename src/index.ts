import express  from "express";
import * as dotenv from 'dotenv';
import UserRouter from "./routes/userRoutes";
import ProductRouter from "./routes/productRoutes"
import AdminRouter from "./routes/adminRoute"
import { dbConnection } from './configuration/config'
import User from "./models/userMod";
import {Address} from "./models/addressMod";
import { Session } from "./models/sessionMod";

const app = express();
app.use(express.json());
new User();
new Address();
new Session();
dotenv.config();
const port = process.env.DB_PORT || 8080;

dbConnection();

app.use('/user', UserRouter);
app.use('/product', ProductRouter);
app.use('/admin', AdminRouter);


app.listen(port, ()=> {
    console.log(`listning at PORT : ${port}`);
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkwODg2NzY0LCJleHAiOjE2OTA5MDQ3NjR9.qTm02W4hrx_ecZSurgs1f0aZfgeU9gcV9pGaOiaq8zc