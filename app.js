import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./src/routes/auth/auth.js";

const app = express();
const Port = process.env.PORT || 3000;

connectDB();

app.use(json());
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Testing the connection of MongoDB with Express");
});

app.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});
