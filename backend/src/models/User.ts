import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcryptjs';

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
  auth_token: string;
  tasks: mongoose.Types.ObjectId[];
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
    auth_token: { type: String, default: "" },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
  },
  { timestamps: true }
);

// Hashear password
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Exportar el modelo usuario
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
