import { Router } from 'express';
import { addGame, listGames } from '../Controllers/gamesController.js';
import { gamesSchema, gameConflict, gameCategoryUnfound } from '../Middlewares/gamesMiddleware.js';

const gamesRouter = Router();

gamesRouter.get('/games', listGames);
gamesRouter.post('/games', gamesSchema, gameConflict, gameCategoryUnfound, addGame);

export default gamesRouter;