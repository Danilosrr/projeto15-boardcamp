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
};

export async function listGames(req, res) {
    const name = req.query.name;

    try {
        if(name){
            const promise = await db.query(`
            SELECT games.*, categories.name as "categoryName"
            FROM games
            JOIN categories
            ON games."categoryId" = categories.id
            WHERE LOWER(games.name) LIKE '${name.toLowerCase()}%'
            `); 
            res.status(200).send(promise.rows);
        }else{
            const promise = await db.query(`
            SELECT games.*, categories.name as "categoryName"
            FROM games
            JOIN categories
            ON games."categoryId" = categories.id
            `);
            res.status(200).send(promise.rows);
        };
    } catch (error) {
        console.log(error);
        res.sendStatus(501);
    };
}