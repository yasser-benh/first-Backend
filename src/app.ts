import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import AppRouter from "./app.router";
import { connectDB } from "./database/connect-db";
import dotenv from "dotenv";
export interface CustomRequest extends Request {
  user?: {
    role: string;
  };
}

const app = express();
const PORT = 3001;

dotenv.config();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url} ${res.statusCode} - ${start}ms`);
    });
    next();
  });
});

app.use((req: CustomRequest, res, next) => {
  req.user = {
    role: "admin",
  };
});

app.listen(PORT, async () => {
  // connect to the database
  await connectDB();
  // Initialize the router
  try {
    AppRouter(app);
  } catch (error) {
    console.log(error);
  }

  console.log(`Server is running on http://localhost:${PORT}`);
});
