import express from "express";
import authRoute from "./routes/auth.route.js"
import messagesRoute from "./routes/message.route.js";
import connectDB from "./lib/db.js";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.io.js";

dotenv.config();

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(cookieparser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/messages", messagesRoute);

server.listen(process.env.PORT, () => {
  console.log("server is running on port 5001");
  connectDB();
});