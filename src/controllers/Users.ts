import express from 'express';
import { validationResult } from 'express-validator';

import UserModel, { IUser } from '../models/User';

class UserController {
    login = async (req: express.Request, res: express.Response) => {
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
    };

    registration = async (req: express.Request, res: express.Response) => {
        const postData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        };

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const user = new UserModel(postData);

        user.save()
            .then((obj: any) => {
                res.json(obj);
            })
            .catch((error) => {
                res.status(500).json({
                    status: 'error',
                    error,
                });
            });
    };
}

export default UserController;
