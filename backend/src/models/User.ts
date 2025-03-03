import mongoose, { Schema, Document } from "mongoose";

// Definir la interfaz para el usuario (Tipado con TypeScript)
export interface IUser extends Document {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  state: boolean;
  createdAt: Date;
}

// Esquema del modelo usuario
const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    state: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Exportar el modelo usuario
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
