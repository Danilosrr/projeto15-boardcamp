import { Router } from 'express';
import { addRental, deleteRent, finishRent, listRentals } from '../Controllers/rentalsController.js';
import { alreadyRentedGame, checkDaysPassed, rentalConflict, rentalSchema } from '../Middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals',listRentals);
rentalsRouter.post('/rentals',rentalSchema, rentalConflict, alreadyRentedGame, addRental);
rentalsRouter.post('/rentals/:id/return',checkDaysPassed ,finishRent);
rentalsRouter.delete('/rentals/:id', deleteRent);

export default rentalsRouter;