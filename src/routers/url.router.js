import express from 'express';
import { getUrl, postUrl } from '../controllers/url.controller.js';
import validateUrl from '../middlewares/url.validation.js';

const urlRouter = express.Router();

urlRouter.post('/urls/shorten',validateUrl,postUrl);
urlRouter.get('/urls/:id',getUrl);

export default urlRouter;