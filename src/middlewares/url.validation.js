import connection from "../database/database.js";
import urlSchema from "../schemas/url.schema.js";
import dayjs from 'dayjs';


async function validateUrl(req,res,next){
    const { url } = req.body;
    const validation = urlSchema.validate({url},{abortEarly:false});

    if(validation.error){
        console.error(validation.error.details);
        return res.status(422).send(validation.error.details);
    }

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const errorMessage = 'Invalid user token, log-in again!'; 

    if (!token) return res.status(401).send(errorMessage);

    let user_id = '';
    try {
        const query = await connection.query(`
            SELECT user_id,created_at 
            FROM sessions 
            WHERE token = $1
        `,[token]);
        user_id = query.rows[0]?.user_id; 

        if(!user_id){
            return res.status(401).send(errorMessage);
        }

        if(dayjs().diff(dayjs(query.rows[0]?.created_at),'h')>2){
            await connection.query(`DELETE FROM sessions WHERE token = $1;`,[token]);
            return res.status(401).send('Expired token!');
        }
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    res.locals.user_id = user_id;
    res.locals.url = url;

    next();
}

export default validateUrl;