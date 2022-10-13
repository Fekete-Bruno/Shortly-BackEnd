import connection from '../database/database.js'

async function postUsers(req,res){
    const user = res.locals.user;
    console.log(user);
    return res.sendStatus(201);
}

export { postUsers };