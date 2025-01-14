import { Express } from "express";
import tasksRouter from "./routes/task.router";
import usersRouter from "./routes/user.router";
import projectsRouter from "./routes/project.router";
import rolesRouter from "./routes/role.router";
import sessionRouter from "./routes/session.router";
import filesRouter from "./routes/file.router";

function AppRouter(app: Express) {
  app.use("/tasks", tasksRouter);
  app.use("/users", usersRouter);
  app.use("/projects", projectsRouter);
  app.use("/roles", rolesRouter);
  app.use("/sessions", sessionRouter);
  app.use("/files", filesRouter);
}

export default AppRouter;
