import { nanoid } from 'nanoid';
import connection from '../database/database.js';

async function postUrl(req,res){
    const user_id = res.locals.user_id;
    const url = res.locals.url;

    const shortUrl = nanoid(12);

    try {
        await connection.query(`
            INSERT INTO links (link,short_link,user_id)
            VALUES ($1,$2,$3);
        `,[url,shortUrl,user_id]);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    return res.status(201).send({shortUrl});
}

export {postUrl};