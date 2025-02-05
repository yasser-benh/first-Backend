import express, { Request } from "express";
import bodyParser from "body-parser";
import AppRouter from "./app.router";
import { connectDB } from "./database/connect-db";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import { decodeToken } from "./helpers/auth/decodeToken";
import "./gateways/messages.gateway";
export interface CustomRequest extends Request {
  user: {
    role: string;
    id: string;
    session_id: string;
  } | null;
}

const app = express();

const PORT = config.get<number>("port");
const WS_PORT = config.get<number>("ws_port");

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

app.use(decodeToken);

app.listen(PORT, async () => {
  // connect to the database
  await connectDB();
  // Initialize the router
  AppRouter(app);

  console.log(`Server is running on http://localhost:${PORT}`);
});
