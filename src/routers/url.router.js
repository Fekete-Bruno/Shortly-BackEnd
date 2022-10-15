import express from 'express';
import { deleteUrl, getUrl, openUrl, postUrl } from '../controllers/url.controller.js';
import validateSession from '../middlewares/session.validation.js';
import { validateUrl, validateUserUrl} from '../middlewares/url.validation.js';


const urlRouter = express.Router();

urlRouter.post('/urls/shorten',validateSession,validateUrl,postUrl);
urlRouter.get('/urls/:id',getUrl);
urlRouter.delete('/urls/:id',validateSession,validateUserUrl,deleteUrl);
urlRouter.get('/urls/open/:shortUrl',openUrl);

export default urlRouter;