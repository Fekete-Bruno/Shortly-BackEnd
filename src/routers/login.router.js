import express from 'express';
import { postLogin } from '../controllers/login.controller.js';
import validateLogin from '../middlewares/login.validation.js';

const loginRouter = express.Router();

loginRouter.post("/signin",validateLogin,postLogin);

export default loginRouter;