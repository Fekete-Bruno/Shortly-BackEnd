import connection from "../database/database.js";
import urlSchema from "../schemas/url.schema.js";
import schemaValidation from "./schemas.validation.js";

function validateUrl(req,res,next){
    const { url } = req.body;

    const isInvalid = schemaValidation(urlSchema,{url});
    if(isInvalid){
        return res.status(422).send(isInvalid);
    }

    res.locals.url = url;

    next();
}

async function validateUserUrl(req,res,next){
    const userId = res.locals.userId;
    const id = req.params.id;
    try {
        const query = await connection.query(`
            SELECT "userId"
            FROM links
            WHERE id = $1;
        `,[id]);
        if(query.rows.length===0){
            return res.sendStatus(404);
        }
        if(userId!==query.rows[0]?.userId){
            return res.sendStatus(401);
        }
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    next();
}

export {validateUrl,validateUserUrl};