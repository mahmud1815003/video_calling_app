const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const createError = require("http-errors");
const { notFoundHandler, errorHandler } = require("./middlewares/error");
const { authRouter } = require("./routes/auth");
const { userRouter } = require("./routes/user");
const { socketVerfiy } = require("./controller/login");
const app = express();
dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});




io.on("connect", (socket) => {
  console.log(socket.id);
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const mongo = process.env.mongo;
const port = process.env.port;

//Routes
app.get("/", (req, res, next) => {
  // next(createError(403,'hello world'));
  res.status(200).json({
    msg: "Hello From, Videology",
  });
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

//Not Found
app.use(notFoundHandler);

//Error Handler
app.use(errorHandler);

mongoose
  .connect(mongo)
  .then(() => {
    server.listen(port, () => {
      console.log("Database Connected");
      console.log(`Server Running on PORT: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
