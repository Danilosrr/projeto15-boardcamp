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
}

function createResponse(obj){
    let response = 
    {
        id: obj.id,
        customerId: obj.customerId,
        gameId: obj.gameId,
        rentDate: obj.rentDate,
        daysRented: obj.daysRented,
        returnDate: obj.returnDate,
        originalPrice: obj.originalPrice,
        delayFee: obj.delayFee,
        customer: {
           id: obj.customerId,
           name: obj.customerName
        },
        game: {
            id: obj.objGameId,
            name: obj.gameName,
            categoryId: obj.categoryId,
            categoryName: obj.categoryName
        }
    }
    return response;
};