import joi from 'joi';

const loginSchema = joi.object({
    email: joi.string().max(100).email().required(),
    password: joi.string().required()
});

export default loginSchema;