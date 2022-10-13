import joi from 'joi';

const userSchema = joi.object({
    name: joi.string().max(100).required(),
    email: joi.string().max(100).email().required(),
    password: joi.string().required(),
    confirmPassword: joi.valid(joi.ref('password')).required()
});

export default userSchema;