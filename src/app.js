import express from 'express';
import cors from 'cors';
import userRouter from './routers/user.router.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);

export default app;