import { Router } from 'express';
import { addRental } from '../Controllers/rentalsController.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', );
rentalsRouter.post('/rentals',addRental);
rentalsRouter.post('/rentals/:id/return',);
rentalsRouter.delete('/rentals/:id',);

export default rentalsRouter;