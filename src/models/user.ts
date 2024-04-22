import mongoose, { Schema, Document } from 'mongoose';

// Define the user schema
interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Create the user model
const User = mongoose.model<IUser>('User', userSchema);

export default User;