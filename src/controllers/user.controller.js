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

    console.log(user);
    return res.sendStatus(201);
}

export { postUsers };