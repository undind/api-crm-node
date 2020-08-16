import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import './core/db';
import createRoutes from './core/routes';

const app = express();
const PORT = 4000;

createRoutes(app);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
