import userSchema from "../schemas/user.schema.js";

function validateUser(req,res,next){
    const user = req.body;
    const validation = userSchema.validate(user,{ abortEarly:false });

    if(validation.error){
        console.error(validation.error.details);
        return res.send(validation.error.details).status(422);
    }

    res.locals.user = user;

    next();
}

export default validateUser;