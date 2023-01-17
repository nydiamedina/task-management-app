import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { AuthController } from "./controllers/auth.controller";
import { TaskController } from "./controllers/task.controller";
import { UserController } from "./controllers/user.controller";

dotenv.config();
const { SERVER_PORT } = process.env;

const app = express();
const authController = new AuthController();
const taskController = new TaskController();
const userController = new UserController();

app.use(express.json());
app.use(cors());

// AUTH
app.post("/api/auth/signup", authController.signup);
app.post("/api/auth/login", authController.login);
// app.post("/api/auth/logout", authController.logout);

// TASKS
app.get("/api/tasks", taskController.getTasks);
app.get("/api/tasks/:taskId", taskController.getTaskById);
app.post("/api/tasks", taskController.createTask);
app.put("/api/tasks/:taskId", taskController.updateTask);
app.delete("/api/tasks/:taskId", taskController.deleteTask);

// USERS: General database CRUD
app.get("/api/users", userController.getUsers);
app.get("/api/users/:userId", userController.getUserById);
app.post("/api/users", userController.createUser);
app.put("/api/users/:userId", userController.updateUser);
app.delete("/api/users/:userId", userController.deleteUser);

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port: ${SERVER_PORT}`);
});
