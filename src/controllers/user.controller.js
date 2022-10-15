import connection from '../database/database.js'
import bcrypt from 'bcrypt';

async function postUsers(req,res){
    const user = res.locals.user;
    const hash = bcrypt.hashSync(user.password,12);
    delete user.password;
    delete user.confirmPassword;
    try {
        await connection.query(`
            INSERT INTO users (name, email, password)
            VALUES ($1,$2,$3)
        `,[user.name,user.email,hash]);
    } catch (error) {
        console.error(error);
        return res.send(error).status(500);
    }
    return res.sendStatus(201);
}

async function getUsers(req,res){
    const userId = res.locals.userId;
    const name = res.locals.name;
    const body = {id:userId,name};

    try {
        const urls = await connection.query(`
            SELECT id,"shortUrl", url, "visitCount"
            FROM links WHERE "userId" = $1
        `,[userId]);
        const visits = await connection.query(`
            SELECT SUM("visitCount") FROM links WHERE "userId" = $1;
        `,[userId]);
        body.visitCount = Number(visits.rows[0]?.sum);
        body.shortenedUrls = urls.rows;
    } catch (error) {
        console.error(error);
        return res.send(error).status(500);
    }

    return res.send(body);
}

export { postUsers, getUsers };