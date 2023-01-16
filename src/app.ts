import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Container } from './container';
import { UserController } from './controllers/user.controller';

dotenv.config();
const { SERVER_PORT } = process.env;

const app = express();
const container = new Container();
const userController = new UserController(container);

app.use(express.json());
app.use(cors());

app.get('/users', userController.getUsers);
app.get('/users/:userId', userController.getUserById);
app.get('/users/:emailAddress', userController.getUserByEmailAddress);
app.post('/users', userController.createUser);

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port: ${SERVER_PORT}`);
});
