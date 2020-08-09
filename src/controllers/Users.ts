import express from 'express';
import { validationResult } from 'express-validator';

import UserModel, { IUser } from '../models/User';

class UserController {
    login = async (req: express.Request, res: express.Response) => {
        try {
            const postData = {
                username: req.body.username,
                password: req.body.password,
            };

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            await UserModel.findOne(
                { username: postData.username, password: postData.password },
                (err, user: IUser) => {
                    if (postData?.password !== user?.password || postData?.username !== user?.username) {
                        return res.status(403).json({
                            status: 'error',
                            message: 'Not correct password or login',
                        });
                    }

                    if (err || !user) {
                        return res.status(404).json({
                            status: 'error',
                            message: 'User is not found!',
                        });
                    }

                    return res.json({
                        status: 'success',
                        user: {
                            username: req.body.username,
                            email: user.email,
                            last_seen: user.last_seen,
                            _id: user._id,
                        },
                    });
                }
            );
        } catch (error) {
            res.status(500).json({
                status: 'error',
                error,
            });
        }
    };

    registration = async (req: express.Request, res: express.Response) => {
        try {
            const postData = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            };

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({ status: 'error', message: errors.array()[0].msg });
            }

            const userName = postData.username;
            const foundedUser = await UserModel.findOne({ username: userName });
            if (foundedUser) {
                return res.status(401).json({
                    status: 'error',
                    message: `User with name: ${userName} already exist!`,
                });
            }

            const userMail = postData.email;
            const foundedUserbyMail = await UserModel.findOne({ email: userMail });
            if (foundedUserbyMail) {
                return res.status(401).json({
                    status: 'error',
                    message: `User with email: ${userMail} already exist!`,
                });
            }

            const user = new UserModel(postData);

            const newUser = await user.save();
            res.json(newUser);
        } catch (error) {
            res.status(500).json({
                status: 'error',
                error,
            });
        }
    };
}

export default UserController;
