import express from "express";
import user_route from "./routes/auth.js";
import brand_router from "./routes/brands.js";
import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.DBLINK, 
    { useNewUrlParser: true}, 
    () => {console.log("Connected to Db")}
);

const rest_server = express();

rest_server.use(express.json());
rest_server.use('/api/users', user_route);
rest_server.use("/api/brands", brand_router);

rest_server.listen(3000, ()=> console.log("Server Running at some port"));
