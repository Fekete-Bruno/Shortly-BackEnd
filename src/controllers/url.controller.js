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

async function getUrl(req,res){
    const id = req.params.id;
    const body = {id};
    let url = '' ,shortUrl = '';
    try {
        const query = await connection.query(`
            SELECT link,short_link
            FROM links
            WHERE id = $1;
        `,[id]);
        if(query.rows.length===0){
            return res.sendStatus(404);
        }
        url = query.rows[0].link;
        shortUrl = query.rows[0].short_link;

    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
    body.url=url;
    body.shortUrl = shortUrl;
    return res.send(body);
}

async function openUrl(req,res){
    const shortUrl = req.params.shortUrl;
    let link = '';

    try {
        const query = await connection.query(`
            SELECT id,link
            FROM links
            WHERE short_link = $1;
        `,[shortUrl]);
        if(query.rows.length===0){
            return res.sendStatus(404);
        }
        link = query.rows[0]?.link;
        await connection.query(`
            UPDATE links 
            SET visitors = visitors + 1 
            WHERE id = $1;
        `,[query.rows[0].id]);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    return res.redirect(link);
}

async function deleteUrl(req,res){
    const id = req.params.id;
    try {
        await connection.query(`
            DELETE FROM links
            WHERE id = $1;
        `,[id]);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
    return res.sendStatus(204);
}

export {postUrl,getUrl,openUrl,deleteUrl};