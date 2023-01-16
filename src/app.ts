import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { UserController } from "./controllers/user.controller";

dotenv.config();
const { SERVER_PORT } = process.env;

const app = express();
const userController = new UserController();

app.use(express.json());
app.use(cors());

// USERS
app.get("/api/users", userController.getUsers);
app.get("/api/users/:userId", userController.getUserById);
app.post("/api/users", userController.createUser);
app.put("/api/users/:userId", userController.updateUser);
app.delete("/api/users/:userId", userController.deleteUser);

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port: ${SERVER_PORT}`);
});
