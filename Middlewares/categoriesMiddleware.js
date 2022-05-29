import joi from "joi";
import db from "../database.js";

export function categoriesSchema(req, res, next){
    const category = req.body;

    const categorySchema = joi.object({
        name: joi.string().required(),
    });

    const validation = categorySchema.validate(category, { abortEarly: false });

    if(validation.error){
        console.log(validation.error.message);
        return res.status(400).send(validation.error.message);
    }else{
        res.locals.body = category;
        next();
    };
}

export async function categoriesConflict(req, res, next){
    const category = res.locals.body;

    const categoryConflict = await db.query(`SELECT * FROM categories WHERE name = '${category.name}'`);

    if(categoryConflict.rowCount !== 0){
        return res.status(409).send('categorie already registered');
    }else{
        next();
    };
}