import joi from "joi";
import db from "../database.js";

export async function addRental(req, res) {
    const rental = req.body;
    const { customerId, gameId, daysRented } = rental;
    const todayDate = new Date().toISOString().split('T')[0];
      
    const rentalSchema = joi.object({
        customerId: joi.number().integer().min(1).required(),
        gameId: joi.number().integer().min(1).required(),
        daysRented: joi.number().integer().min(1).required(),
    });

    const validation = rentalSchema.validate(rental, { abortEarly: false });

    if(validation.error){
        console.log(validation.error.message);
        return res.status(400).send(validation.error.message);
    }

    const customerIdConflict = await db.query(`SELECT * FROM customers WHERE id = $1`, [customerId]);

    if(customerIdConflict.rowCount === 0){
        return res.status(400).send('Customer not registered');
    }

    const gameIdConflict = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId]);

    if(gameIdConflict.rowCount === 0){
        return res.status(400).send('Game not registered');
    }

    const gameAlreadyRented = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`, [gameId]);
    console.log(gameAlreadyRented.rowCount)
    if(gameAlreadyRented.rowCount >= gameIdConflict.rows[0].stockTotal){
        return res.status(400).send('Game not available');
    }  

    const originalPrice = parseInt(daysRented * gameIdConflict.rows[0].pricePerDay);

    const promise = await db.query(`
    INSERT INTO rentals
    (
        id,
        "customerId",
        "gameId",
        "rentDate",
        "daysRented",
        "returnDate",
        "originalPrice",
        "delayFee"
    )
    VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)
    `, [customerId, gameId, todayDate, daysRented, null, originalPrice, null]);
    return res.sendStatus(201);
};