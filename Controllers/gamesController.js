import db from "../database.js";

export async function addGame(req, res){
    const { name, image, stockTotal, categoryId, pricePerDay } = res.locals.body;

    try {
        const promise = await db.query(`INSERT INTO games (id, name, image, "stockTotal", "categoryId", "pricePerDay") VALUES (DEFAULT, $1, $2, $3, $4, $5)`, [name, image, stockTotal, categoryId, pricePerDay]);
        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(422);
    };
}