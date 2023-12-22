import bodyParser from "body-parser";
import express from "express";
import databaseConnect from "./config/database";
import compression from "compression";
import cookieParser from "cookie-parser";
import http from "http";
import { Server, Socket } from "socket.io";
import rootEndPoint from "./config/endpoint";
import userRoutes from "./routes/user";
import cors from "cors";


databaseConnect();
require("dotenv").config();
const app = express();
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
const server = http.createServer(app);
const port = process.env.PORT;
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  app.disable("x-powered-by");
app.use(express.json({ limit: "50mb"}));
app.use(express.urlencoded({ limit: "50mb" , extended: true }));
app.use(cookieParser());
app.use(
    cors({
      credentials: true,
      origin: process.env.ALLOWED_DOMAINS?.split(" "),
      optionsSuccessStatus: 200,
    })
  );

const routes=[
        {
            path: `${rootEndPoint}/`,
            func: userRoutes,
          },
    
];
routes.forEach(({ path, func }) => {
    app.use(path, func);
  });
  server.listen(port, () => {
    console.log(`Local Server Runnig on http://localhost:${port}`);
  });