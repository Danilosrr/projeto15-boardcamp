import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import rentalsRouter from './Routers/rentalsRouter.js';
import customersRouter from './Routers/customersRouter.js';
import gamesRouter from './Routers/gamesRouter.js';
import categoriesRouter from './Routers/categoriesRouter.js';

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);

app.listen(process.env.PORT, () => {
  console.log('Server running on port', process.env.PORT)}
);