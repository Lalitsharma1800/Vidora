import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: "16Kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import commentRouter from "./routes/comment.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/channel", subscriptionRouter);
app.use("/api/v1/reaction", likeRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/comment", commentRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
  next();
});
export { app };
