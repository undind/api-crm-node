import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string,
  password: string,
  last_seen?: string,
  id: string
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: 'Email обязателен!',
    unique: true
  },
  password: {
    type: String,
    required: 'Пароль обязателен'
  },
  last_seen: {
    type: Date,
    default: new Date()
  }
}, {
  timestamps: true
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;