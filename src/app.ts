import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port: ${SERVER_PORT}`);
});
