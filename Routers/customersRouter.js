import { Router } from 'express';
import { addCustomer, listCustomers, listCustomersById, updateCustomer } from '../Controllers/customersController.js';
import { customerCpfConflict, customerSchema, updateCustomerCpf } from '../Middlewares/customersMiddleware.js';

const customersRouter = Router();

customersRouter.get('/customers', listCustomers);
customersRouter.get('/customers/:id', listCustomersById);
customersRouter.post('/customers', customerSchema, customerCpfConflict, addCustomer);
customersRouter.put('/customers/:id', customerSchema, updateCustomerCpf, updateCustomer);

export default customersRouter;