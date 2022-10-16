import express from 'express';
import getRanking from '../controllers/ranking.controller.js';

const rankingRouter = express.Router();

rankingRouter.get('/ranking',getRanking);

export default rankingRouter;