import db from "../database.js";
import { createResponse } from "../utils/functions.js";

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

export async function listRentals(req, res){
    const customerId = req.query.customerId;
    const gameId = req.query.gameId;

    const query = `
    SELECT rentals.*,
    customers.id AS "customerId",
    customers.name AS "customerName",
    games.id AS "objGameId",
    games.name AS "gameName",
    categories.name AS "categoryName",
    games."categoryId"
    FROM rentals 
    JOIN customers ON rentals."customerId"=customers.id 
    JOIN games ON rentals."gameId"=games.id
    JOIN categories ON games."categoryId"=categories.id
    ${gameId?`WHERE games.id=${gameId}`:``}
    ${customerId?`WHERE customers.id=${customerId}`:``}
    `

    try {
        const promise = await db.query(query);
        const response = (promise.rows).map( obj => createResponse(obj));
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

export async function finishRent(req, res){
    const id = req.params.id;
    const { todayDate, daysPassed, daysRented, pricePerDay } = res.locals.body;

    const delayFee = (daysPassed - daysRented) >= 0 ? (daysPassed - daysRented)*pricePerDay : 0;

    try {
        const promise = await db.query(`UPDATE rentals SET ("returnDate", "delayFee") = ($2, $3) WHERE id=$1`,[id, todayDate, delayFee]);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

