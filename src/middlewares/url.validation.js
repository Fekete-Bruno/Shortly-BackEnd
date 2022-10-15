import connection from "../database/database.js";
import urlSchema from "../schemas/url.schema.js";

function validateUrl(req,res,next){
    const { url } = req.body;
    const validation = urlSchema.validate({url},{abortEarly:false});

    if(validation.error){
        console.error(validation.error.details);
        return res.status(422).send(validation.error.details);
    }

    res.locals.url = url;

    next();
}

async function validateUserUrl(req,res,next){
    const user_id = res.locals.user_id;
    const id = req.params.id;
    try {
        const query = await connection.query(`
            SELECT user_id
            FROM links
            WHERE id = $1;
        `,[id]);
        if(query.rows.length===0){
            return res.sendStatus(404);
        }
        if(user_id!==query.rows[0]?.user_id){
            return res.sendStatus(401);
        }
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    next();
}

export {validateUrl,validateUserUrl};