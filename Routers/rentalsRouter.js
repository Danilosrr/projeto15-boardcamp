import { Router } from 'express';
import { addRental } from '../Controllers/rentalsController.js';
import { alreadyRentedGame, rentalConflict, rentalSchema } from '../Middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', );
rentalsRouter.post('/rentals',rentalSchema, rentalConflict, alreadyRentedGame, addRental);
rentalsRouter.post('/rentals/:id/return',);
rentalsRouter.delete('/rentals/:id',);

export default rentalsRouter;