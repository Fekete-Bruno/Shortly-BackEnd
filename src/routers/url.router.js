import express from 'express';
import { postUrl } from '../controllers/url.controller.js';
import validateUrl from '../middlewares/url.validation.js';

const urlRouter = express.Router();

urlRouter.post('/urls/shorten',validateUrl,postUrl);

export default urlRouter;