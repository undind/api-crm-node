import mongoose, { Schema, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    last_seen?: string;
    id: string;
}

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: 'User name is required',
            unique: true,
        },
        email: {
            type: String,
            required: 'Email is required!',
            validate: [isEmail, 'Invalid Email'],
            unique: true,
        },
        password: {
            type: String,
            required: 'Password is required',
        },
        last_seen: {
            type: Date,
            default: new Date(),
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
