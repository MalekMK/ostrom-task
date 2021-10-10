import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import studentRoutes from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

const PORT: string | number = process.env.PORT! || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(studentRoutes);

mongoose
  .connect(process.env.MONGOURI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log(err));
