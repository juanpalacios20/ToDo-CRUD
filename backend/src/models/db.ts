import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/ToDo_CRUD"; // Reemplázalo con el nombre de tu BD

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Aumenta el tiempo de espera
    });
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1); // Termina el proceso si falla la conexión
  }
};

export default connectDB;
