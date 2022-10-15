import {v4 as uuid} from 'uuid';
import connection from '../database/database.js';

async function postLogin(req,res){
    const token = uuid();
    const userId = res.locals.userId;

    try {
        await connection.query(`
            INSERT INTO sessions ("userId",token)
            VALUES ($1,$2);
        `,[userId,token]);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }


    return res.send({token});
}

export {postLogin};