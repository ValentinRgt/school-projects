import { model, Schema } from 'mongoose';

interface UserDTO {
  username: string,
  nickname: string | null,
  email: string,
  password: string,
  socketId: string | null,
  createdAt: string,
  updatedAt: string | null,
  lastLogin: string | null,
}

const schema = new Schema<UserDTO>({
  username: { type: String, required: true, index: { unique: true } },
  nickname: { type: String, default: null },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  socketId: { type: String, default: null },
  createdAt: { type: String, default: new Date().toISOString() },
  updatedAt: { type: String, default: null },
  lastLogin: { type: String, default: null }
});

const User = model<UserDTO>('User', schema, 'users')

export default User;