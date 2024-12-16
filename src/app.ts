import express from "express";
import bodyParser from "body-parser";
import AppRouter from "./app.router";
import { connectDB } from "./database/connect-db";
import dotenv from "dotenv";
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
    const elapsed = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} - ${elapsed}ms`);
  });
  next();
});

app.listen(PORT, async () => {
  // connect to the database
  await connectDB();
  // Initialize the router
  AppRouter(app);
  console.log(`Server is running on http://localhost:${PORT}`);
});
