import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./src/routes/auth/auth.js";
import userRoutes from "./src/routes/users/switchUser.js";
import productRoutes from "./src/routes/products/products.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const Port = process.env.PORT || 3000;

connectDB();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Express API",
      version: "1.0.0",
      description: "API documentation for Express backend",
    },
    servers: [
      {
        url: "http://localhost:" + Port,
      },
    ],
  },
  apis: ["./src/routes/**/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Testing the connection of MongoDB with Express");
});

app.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});
