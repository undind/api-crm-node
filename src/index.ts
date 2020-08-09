import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import Users from './controllers/Users';

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

import './core/db';

const UsersController = new Users();

//Users
app.post('/api/signup', UsersController.registration);
app.post('/api/signin', UsersController.login);

app.use('*', async (req: express.Request, res: express.Response) => {
    await res.sendFile(path.join(__dirname, '.', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
