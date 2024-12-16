import { Express } from "express";
import tasksRouter from "./routes/task.router";
import usersRouter from "./routes/user.router";

function AppRouter(app: Express) {
  app.use("/tasks", tasksRouter);
  app.use("/users", usersRouter);
}

export default AppRouter;
