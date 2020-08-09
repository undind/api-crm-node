import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import path from 'path';

import { Users } from '../controllers';
import { validateSignIn, validateSignUp } from '../helpers/validation';

const createRoutes = (app: express.Express) => {
    const UserController = new Users();

    app.use(cors());
    app.use(bodyParser.json());

    //Users
    app.post('/api/signup', validateSignUp, UserController.registration);
    app.post('/api/signin', validateSignIn, UserController.login);

    app.use('*', async (req: express.Request, res: express.Response) => {
        await res.sendFile(path.join(__dirname, '..', 'index.html'));
    });
};

export default createRoutes;
