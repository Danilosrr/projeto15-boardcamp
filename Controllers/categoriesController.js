import db from "../database.js";

export async function listCategories(req, res) {
    try {
        const promise = await db.query('SELECT * FROM categories');
        res.status(200).send(promise.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(501);
    }
}

export async function addCategories(req, res) {
    const category = res.locals.body;

    try {
        const promise = await db.query(`INSERT INTO categories (id, name) VALUES (DEFAULT, $1)`, [category.name]);
        console.log(promise)
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(422);
    };
}