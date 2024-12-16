import { Express } from "express";
import tasksRouter from "./routes/task.router";
import usersRouter from "./routes/user.router";
import projectsRouter from "./routes/project.router";

function AppRouter(app: Express) {
  app.use("/tasks", tasksRouter);
  app.use("/users", usersRouter);
  app.use("/projects", projectsRouter);
}

export default AppRouter;
