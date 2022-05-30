import db from "../database.js";

export async function addRental(req, res) {
    const {customerId,gameId,todayDate,daysRented,originalPrice} = res.locals.body;
    
    try {
        await db.query(`
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
    } catch (error) {
        console.log(error,res.locals.body);
        return res.sendStatus(400)
    };
};