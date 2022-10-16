import connection from "../database/database.js";
import userSchema from "../schemas/user.schema.js";
import schemaValidation from "./schemas.validation.js";

async function validateNewUser(req,res,next){
    const { name,email,password,confirmPassword } = req.body;
    const user = {name,email,password,confirmPassword};
    const errorMessage = "This user email already exists!"

    const isInvalid = schemaValidation(userSchema,user);
    if(isInvalid){
        return res.status(422).send(isInvalid);
    }

    try {
        const query = await connection.query('SELECT email FROM users WHERE email=$1',[user.email]);
        if(query.rows.length>0){
            return res.status(409).send(errorMessage);
        }; 
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
    

    res.locals.user = user;

    next();
}

async function validateUser(req,res,next){
    const userId = res.locals.userId;
    try {
        const query = await connection.query(`
            SELECT name
            FROM users
            WHERE id = $1;
        `,[userId]);

        if(query.rows.length===0){
            return res.sendStatus(404);
        }
        res.locals.name = query.rows[0]?.name;
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    next();
}



export {validateNewUser,validateUser};