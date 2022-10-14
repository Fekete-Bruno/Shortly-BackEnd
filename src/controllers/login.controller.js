import {v4 as uuid} from 'uuid';
import connection from '../database/database.js';

async function postLogin(req,res){
    const token = uuid();
    const user_id = res.locals.user_id;

    try {
        await connection.query(`
            INSERT INTO sessions (user_id,token)
            VALUES ($1,$2);
        `,[user_id,token]);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }


    return res.send({token});
}

export {postLogin};