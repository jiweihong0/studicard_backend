import express from "express";
import cookieParser from "cookie-parser";

// Initialize app engine
const app = express();

// General middleware
app.use(express.json());
app.use(cookieParser());


export default app

