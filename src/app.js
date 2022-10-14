import express from 'express';
import cors from 'cors';
import userRouter from './routers/user.router.js';
import loginRouter from './routers/login.router.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(loginRouter);

export default app;