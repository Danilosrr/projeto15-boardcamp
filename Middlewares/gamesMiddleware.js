import joi from "joi";
import db from "../database.js";

export function gamesSchema(req, res, next){
    const game = req.body;

    const gameSchema = joi.object({
        name: joi.string().required(),
        image: joi.string().required(),
        stockTotal: joi.number().positive().integer().required(),
        categoryId: joi.number().positive().integer().required(),
        pricePerDay: joi.number().positive().required(),
    });
    
    const validation = gameSchema.validate(game, { abortEarly: false });

    if(validation.error){
        console.log(validation.error.message);
        return res.status(400).send(validation.error.message);
    }else{
        res.locals.body = game;
        next();
    };
};

export async function gameConflict(req, res, next) {
    const game = res.locals.body;

    const gamesConflict = await db.query(`SELECT * FROM games WHERE name = $1;`, [game.name]);

    if(gamesConflict.rowCount !== 0){
        return res.status(409).send('Game already exists');
    }else{
        next();   
    };    
};

export async function gameCategoryUnfound(req, res, next) {
    const game = req.body;

    const allcategories = await db.query('SELECT * FROM categories');
    
    let categoriesIds = (allcategories.rows).map(obj=>{ return obj.id });

    if (categoriesIds.includes(game.categoryId)) {
        next();
    }else{
        return res.status(400).send('Game category dont exist')
    };
};