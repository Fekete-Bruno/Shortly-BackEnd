import connection from "../database/database.js";
import loginSchema from "../schemas/login.schema.js";
import bcrypt from 'bcrypt';

async function validateLogin(req,res,next){
    const {email,password} = req.body;
    const userBody = {email,password};
    const validation = loginSchema.validate(userBody, {abortEarly:false});
    const errorMessage = {error:"Wrong email or password!"}
    let user = {};

    if(validation.error){
        console.error(validation.error.details);
        return res.status(422).send(validation.error.details);
    }

    try {
        const query = await connection.query('SELECT * FROM users WHERE email=$1',[email]);
        user = query.rows[0];

        if(!user){
            return res.status(401).send(errorMessage);
        }

        const hash = user.password;
        if(!bcrypt.compareSync(password,hash)){
            return res.status(401).send(errorMessage);
        }
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

    delete user.password;
    res.locals.userId=user.id;

    next();
}

export default validateLogin;