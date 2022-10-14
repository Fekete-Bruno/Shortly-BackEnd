import express from "express";
import { postUsers } from "../controllers/user.controller.js";
import validateUser from "../middlewares/user.validation.js";

const userRouter = express.Router();

userRouter.post("/signup",validateUser,postUsers);

export default userRouter;