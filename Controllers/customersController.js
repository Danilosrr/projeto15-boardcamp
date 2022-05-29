import db from "../database.js";

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