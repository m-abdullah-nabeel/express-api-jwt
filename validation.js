import Joi from "Joi";

// REGISTER VALIDATION
const register_validation = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        pass: Joi.string().min(8).required(),
    })
    return schema.validate(data);
}

// LOGIN VALIDATION
const login_validation = (data) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        pass: Joi.string().min(8).required(),
    })
    return schema.validate(data);
}

export {register_validation, login_validation};
