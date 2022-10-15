import express from "express";
import { getUsers, postUsers } from "../controllers/user.controller.js";
import validateSession from "../middlewares/session.validation.js";
import {validateNewUser, validateUser} from "../middlewares/user.validation.js";

const userRouter = express.Router();

userRouter.post("/signup",validateNewUser,postUsers);
userRouter.get('/users/me', validateSession, validateUser, getUsers)

export default userRouter;