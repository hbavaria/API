import express from "express";
import proxy from "http-proxy-middleware";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import socketIo from "socket.io";
import compression from "compression";
dotenv.config(); //init env variables

var app = express();
var http = require("http").createServer();
var io = socketIo(http);
app.use(compression()); //use compression to help performance, see https://alligator.io/nodejs/compression/ for more details
app.use(bodyParser.json({ limit: "50mb" })); //init json parser

//import routes
import authRoute from "./routes/auth";
import perfRoute from "./routes/performance";
import csvRoute from "./routes/StorePerformanceData";

app.use(express.static("doc")); //serve api documentation files

app.use(cors({ origin: process.env.DELTA_DIAGNOSTICS_URL, credentials: true }));

//proxies all requests starting with /api to OeWeb and sends back the response to client
app.use(
  "/api",
  proxy({
    target: process.env.OE_WEB_SERVER_URL,
    ws: true //enables websockets
  })
);

// init routes
app.use("/auth", authRoute);
app.use("/performance", perfRoute);
app.use ("/StorePerformanceData", csvRoute)

//connect to mongodb
mongoose.connect(
  `${process.env.DB_CONNECTION}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err: any) => {
    if (err) {
      console.log(`Error while connecting to database: ${err}`);
    } else console.log("Connected to database");
  }
);

//init app
app.listen(process.env.DELTA_DIAGNOSTICS_API_PORT || 4000);

//init websocket server
http.listen(process.env.DELTA_DIAGNOSTICS_API_WS_PORT || 4001);
io.on("connection", function(socket) {
  console.log("Socket connected: " + socket.id);
  socket.on("manual-disconnection", function(data) {
    console.log("Socket disconnected: " + data);
  });
});

app.locals.io = io;
