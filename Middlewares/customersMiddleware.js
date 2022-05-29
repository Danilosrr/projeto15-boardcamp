import db from "../database.js";
import joi from "joi";
import JoiDate from '@joi/date';

const Joi = joi.extend(JoiDate);

export function customerSchema(req, res, next){
    const customer = req.body;

    const customerSchema = joi.object({
        name: joi.string().required(),
        phone: joi.string().pattern(/^[0-9]{10,11}$/).required(),
        cpf: joi.string().pattern(/^[0-9]{11}$/).required(),
        birthday: Joi.date().format("YYYY-MM-DD").max('now').required()
    });
    
    const validation = customerSchema.validate(customer, { abortEarly: false });

    if(validation.error){
        console.log(validation.error.message);
        return res.status(400).send(validation.error.message);
    }else{
        res.locals.body = customer;
        next();
    };
};

export async function customerCpfConflict(req, res, next){
    const customer = res.locals.body;

    const cpfConflict = await db.query(`SELECT * FROM customers WHERE cpf = '${customer.cpf}'`);

    if(cpfConflict.rowCount !== 0){
        return res.status(409).send('cpf already registered');
    }else{
        next();
    };
};

export async function updateCustomerCpf(req, res, next){
    const customer = res.locals.body;

    const cpfConflict = await db.query(`SELECT * FROM customers WHERE cpf = '${customer.cpf}'`);

    if(cpfConflict.rowCount === 0){
        return res.status(404).send('cpf not registered');
    }else{
        next();
    };
};