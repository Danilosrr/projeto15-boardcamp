import { Router } from 'express';
import { addCategories, listCategories } from '../Controllers/categoriesController.js';
import { categoriesConflict, categoriesSchema } from '../Middlewares/categoriesMiddleware.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', listCategories);
categoriesRouter.post('/categories', categoriesSchema, categoriesConflict, addCategories);

export default categoriesRouter;