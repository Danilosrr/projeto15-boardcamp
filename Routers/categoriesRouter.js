import { Router } from 'express';
import { addCategories, listCategories } from '../Controllers/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.get('/categories', listCategories);
categoriesRouter.post('/categories', addCategories);

export default categoriesRouter;