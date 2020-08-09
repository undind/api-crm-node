import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

import './core/db';

app.use('*', async (req: express.Request, res: express.Response) => {
  await res.sendFile(path.join(__dirname, '.', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));