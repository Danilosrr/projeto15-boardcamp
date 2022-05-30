import joi from "joi";
import db from "../database.js";
import { getDayDiff } from "../utils/functions.js";

export function rentalSchema(req, res, next){    
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
    }else{
        res.locals.body = { customerId, gameId, daysRented, todayDate };
        next();
    };
};

export async function rentalConflict(req, res, next){
    const rent = res.locals.body

    const customerIdConflict = await db.query(`SELECT * FROM customers WHERE id = $1`, [rent.customerId]);
    if(customerIdConflict.rowCount === 0){
        return res.status(400).send('Customer not registered');
    };

    const gameIdConflict = await db.query(`SELECT * FROM games WHERE id = $1`, [rent.gameId]);
    if(gameIdConflict.rowCount === 0){
        return res.status(400).send('Game not registered');
    };

    let stockTotal = gameIdConflict.rows[0].stockTotal;
    let pricePerDay = gameIdConflict.rows[0].pricePerDay;
    res.locals.body = {...rent,stockTotal,pricePerDay};
    next();
};

export async function alreadyRentedGame(req, res, next){
    const rent = res.locals.body

    const gameAlreadyRented = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`, [rent.gameId]);
    if(gameAlreadyRented.rowCount >= rent.stockTotal){
        return res.status(400).send('Game not available');
    }

    const originalPrice = parseInt(rent.daysRented * rent.pricePerDay);
    res.locals.body = {...rent,originalPrice};
    next();
};

export async function checkDaysPassed(req, res, next){
    const id = req.params.id;

    const checkId = await db.query(`SELECT * FROM rentals WHERE id=$1`,[id])
    if(checkId.rowCount === 0){
        return res.sendStatus(404);
    };

    try {        
        const promise = await db.query(`
            SELECT rentals.*,games."pricePerDay" 
            FROM rentals 
            JOIN games ON "gameId" = games.id 
            WHERE rentals.id=$1 
            AND rentals."returnDate" IS NULL 
        `,[id]);

        if(promise.rowCount === 0){
            return res.status(400).send('No open rent found'); 
        };

        const todayDate = new Date().toISOString().split('T')[0];
        const daysPassed = getDayDiff(promise.rows[0].rentDate,todayDate);    
        
        res.locals.body = {todayDate, daysPassed, daysRented:promise.rows[0].daysRented, pricePerDay:promise.rows[0].pricePerDay};
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    };   
};