import mongoose, { Schema, Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

import { IUser } from '../types/users';
import generatePsswordHash from '../helpers/generatePsswordHash';

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

UserSchema.pre('save', async function(next) {
    const user: any = this;

    if(!user.isModified('password')) {
        return next();
    }

    user.password = await generatePsswordHash(user.password);
})

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
