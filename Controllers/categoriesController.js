import db from "../database.js";
import joi from "joi";

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
    const category = req.body

    const categorySchema = joi.object({
        name: joi.string().required(),
    });

    const validation = categorySchema.validate(category, { abortEarly: false });

    if(validation.error){
        console.log(validation.error.message);
        return res.status(400).send(validation.error.message);
    };
    
    const categoryConflict = await db.query(`SELECT * FROM categories WHERE name = '${category.name}'`);
    if(categoryConflict.rowCount !== 0){
        return res.status(409).send('categorie already registered');
    };

    try {
        console.log(validation);
        const promise = await db.query(`INSERT INTO categories (id, name) VALUES (DEFAULT, $1)`, [category.name]);
        console.log(promise)
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(422);
    };
}