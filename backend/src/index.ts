import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import connectDB from "./models/db";

const app = express();
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor corriendo 🚀");
});

// Configurar rutas
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
