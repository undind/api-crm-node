import express from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import UserModel from '../models/User';
import { IUser } from '../types/users';
import createJWToken from '../helpers/createJWToken';

class UserController {
    login = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const postData = {
                username: req.body.username,
                password: req.body.password,
            } as Pick<IUser, 'username' | 'password'>;

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });
            }

            await UserModel.findOne(
                { username: postData.username },
                (err, user: IUser) => {
                    if (err || !user) {
                        return res.status(404).json({
                            status: 'error',
                            message: 'User is not found!',
                        });
                    }

                    if (bcrypt.compareSync(postData.password, user.password)) {
                        const token = createJWToken(user);
                        return res.status(200).json({
                            status: 'success',
                            token
                        })
                    } else {
                        return res.status(403).json({
                            status: 'error',
                            message: 'Incorrect password or email'
                        })
                    }
                }
            );
        } catch (error) {
            res.status(500).json({
                status: 'error',
                error,
            });
        }
    };

    registration = async (req: express.Request, res: express.Response): Promise<void> => {
        try {
            const postData = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            } as Pick<IUser, 'username' | 'password' | 'email'>;

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(422).json({ status: 'error', message: errors.array()[0].msg });
            }

            const userName = postData.username;
            const foundedUser: IUser | null = await UserModel.findOne({ username: userName });
            if (foundedUser) {
                res.status(401).json({
                    status: 'error',
                    message: `User with name: ${userName} already exist!`,
                });
            }

            const userMail = postData.email;
            const foundedUserByMail: IUser | null = await UserModel.findOne({ email: userMail });
            if (foundedUserByMail) {
                res.status(401).json({
                    status: 'error',
                    message: `User with email: ${userMail} already exist!`,
                });
            }

            const user: IUser = new UserModel(postData);

            const newUser: IUser = await user.save();
            res.status(200).json({ status: 'success' });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                error,
            });
        }
    };
}

export default UserController;
