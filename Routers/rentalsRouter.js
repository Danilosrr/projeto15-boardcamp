import { Router } from 'express';
import { addRental, listRentals } from '../Controllers/rentalsController.js';
import { alreadyRentedGame, rentalConflict, rentalSchema } from '../Middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals',listRentals);
rentalsRouter.post('/rentals',rentalSchema, rentalConflict, alreadyRentedGame, addRental);
rentalsRouter.post('/rentals/:id/return',);
rentalsRouter.delete('/rentals/:id',);

export default rentalsRouter;