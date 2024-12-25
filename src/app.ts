import express, { Request } from "express";
import bodyParser from "body-parser";
import AppRouter from "./app.router";
import { connectDB } from "./database/connect-db";
import dotenv from "dotenv";
dotenv.config();
import config from "config";

export interface CustomRequest extends Request {
  user?: {
    role: string;
    id: string;
    session_id: string;
  };
}

const app = express();

const PORT = config.get<number>("port");

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
  next();
});

app.use((req: CustomRequest, res, next) => {
  req.user = {
    role: "admin++",
    id: "123",
    session_id: "123",
  };
  next();
});

app.listen(PORT, async () => {
  // connect to the database
  await connectDB();
  // Initialize the router
  AppRouter(app);

  console.log(`Server is running on http://localhost:${PORT}`);
});
