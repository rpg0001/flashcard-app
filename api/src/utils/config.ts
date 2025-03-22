import joi from 'joi';

const environmentSchema = joi
    .object()
    .keys({
        DB_HOST: joi.string().required(),
        DB_USER: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_NAME: joi.string().required(),
        NODE_ENV: joi.string().valid("production", "development", "test"),
        LOG_LEVEL: joi.string().valid('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'),
        PORT: joi.number().positive(),
        ADMIN_KEY: joi.string().required(),
        SECRET: joi.string().required()
    })
    .unknown();

const { value, error } = environmentSchema.prefs({ errors: { label: 'key'}}).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
    DB_HOST: value.DB_HOST,
    DB_USER: value.DB_USER,
    DB_PASSWORD: value.DB_PASSWORD,
    DB_NAME: value.DB_NAME,
    NODE_ENV: value.NODE_ENV,
    LOG_LEVEL: value.LOG_LEVEL,
    PORT: value.PORT,
    ADMIN_KEY: value.ADMIN_KEY,
    SECRET: value.SECRET
}