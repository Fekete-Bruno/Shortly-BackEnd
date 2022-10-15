import connection from '../database/database.js';
import dayjs from 'dayjs';

async function validateSession(req,res,next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const errorMessage = 'Invalid user token, log-in again!'; 

    if (!token) return res.status(401).send(errorMessage);

    let userId = '';
    try {
        const query = await connection.query(`
            SELECT "userId","createdAt" 
            FROM sessions 
            WHERE token = $1
        `,[token]);
        userId = query.rows[0]?.userId; 

        if(!userId){
            return res.status(401).send(errorMessage);
        }

        if(dayjs().diff(dayjs(query.rows[0]?.createdAt),'h')>2){
            await connection.query(`DELETE FROM sessions WHERE token = $1;`,[token]);
            return res.status(401).send('Expired token!');
        }
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    res.locals.userId = userId;

    next();
}

export default validateSession;