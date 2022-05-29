import db from "../database.js";

export async function listCustomers(req, res) {
    const cpf = req.query.cpf;

    try {
        if(cpf){
            const promise = await db.query(`SELECT * FROM customers WHERE cpf LIKE '${cpf}%'`);
            return res.status(200).send(promise.rows);    
        }else{
            const promise = await db.query('SELECT * FROM customers');
            return res.status(200).send(promise.rows);    
        };
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

export async function listCustomersById(req, res) {
    const id = req.params.id;

    try {
        const promise = await db.query('SELECT * FROM customers WHERE id=$1',[id]);

        if(promise.rowCount === 0){
            return res.sendStatus(404);
        }else{
            return res.status(200).send(promise.rows);      
        };
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

export async function addCustomer(req, res) {
    const customer = res.locals.body;
    
    try {
        const { name, phone, cpf, birthday } = customer;
        await db.query(`
            INSERT INTO customers (id, name, phone, cpf, birthday) VALUES (DEFAULT, $1, $2, $3, $4)
        `, [name, phone, cpf, birthday]);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

export async function updateCustomer(req, res) {
    const id = req.params.id;
    const customer = res.locals.body;

    try {
        const { name, phone, cpf, birthday } = customer;
        await db.query(`
            UPDATE customers SET (name, phone, cpf, birthday) = ( $1, $2, $3, $4) WHERE customers.id = ${id}
        `, [name, phone, cpf, birthday]);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};    