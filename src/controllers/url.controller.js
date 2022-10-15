import { nanoid } from 'nanoid';
import connection from '../database/database.js';

async function postUrl(req,res){
    const userId = res.locals.userId;
    const url = res.locals.url;

    const shortUrl = nanoid(12);

    try {
        await connection.query(`
            INSERT INTO links (url,"shortUrl","userId")
            VALUES ($1,$2,$3);
        `,[url,shortUrl,userId]);
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
            SELECT url,"shortUrl"
            FROM links
            WHERE id = $1;
        `,[id]);
        if(query.rows.length===0){
            return res.sendStatus(404);
        }
        url = query.rows[0].url;
        shortUrl = query.rows[0].shortUrl;

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
    let url = '';

    try {
        const query = await connection.query(`
            SELECT id,url
            FROM links
            WHERE "shortUrl" = $1;
        `,[shortUrl]);
        if(query.rows.length===0){
            return res.sendStatus(404);
        }
        url = query.rows[0]?.url;
        await connection.query(`
            UPDATE links 
            SET "visitCount" = "visitCount" + 1 
            WHERE id = $1;
        `,[query.rows[0].id]);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    return res.redirect(url);
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