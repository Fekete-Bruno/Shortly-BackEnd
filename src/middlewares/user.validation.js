import connection from "../database/database.js";
import userSchema from "../schemas/user.schema.js";

async function validateUser(req,res,next){
    const { name,email,password,confirmPassword } = req.body;
    const user = {name,email,password,confirmPassword};
    const validation = userSchema.validate(user,{ abortEarly:false });

    if(validation.error){
        console.error(validation.error.details);
        return res.send(validation.error.details).status(422);
    }

    try {
        const query = await connection.query('SELECT email FROM users WHERE email=$1',[user.email]);
        if(query.rows.length>0){
            return res.sendStatus(409);
        }; 
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
    

    res.locals.user = user;

    next();
}

export default validateUser;