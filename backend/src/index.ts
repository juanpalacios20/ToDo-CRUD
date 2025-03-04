import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";
import connectDB from "./models/db";

const app = express();
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Servidor corriendo 🚀");
});

// Configurar rutas
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
