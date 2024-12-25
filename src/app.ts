import express, { Request } from "express";
import bodyParser from "body-parser";
import AppRouter from "./app.router";
import { connectDB } from "./database/connect-db";
import dotenv from "dotenv";
import config from "config";

export interface CustomRequest extends Request {
  user?: {
    role: string;
  };
}

const app = express();

dotenv.config();

const PORT = config.get("port");

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
    role: "admin",
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
