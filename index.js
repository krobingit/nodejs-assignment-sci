import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan"
import cors from "cors"
import { usersRoute } from "./routes/users.js";
import session from "express-session";
import { organizationsRoute } from "./routes/organizations.js";

dotenv.config()
const app=express()

mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(()=>console.log("MongoDB connected successfully")).catch(err=>console.log(err))


const PORT=process.env.PORT;
app.use(
    session({
      secret: "sciflare@123",
      resave: false,
      saveUninitialized: false
    })
  );
app.use(express.json())

app.use(morgan("dev"));
app.disable("etag");
app.use(cors())

app.use("/api/users",usersRoute)
app.use("/api/organizations",organizationsRoute)

app.listen(PORT,()=>{
    console.log(`server running successfully at ${PORT}`)
})