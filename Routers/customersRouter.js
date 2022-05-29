import { Router } from 'express';
import { addCustomer } from '../Controllers/customersController.js';
import { customerCpfConflict, customerSchema } from '../Middlewares/customersMiddleware.js';

const customersRouter = Router();

customersRouter.get('/customers', );
customersRouter.get('/customers/:id', );
customersRouter.post('/customers', customerSchema, customerCpfConflict, addCustomer);
customersRouter.put('/customers/:id', );

export default customersRouter;