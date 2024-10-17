const dotenv = require('dotenv').config();
module.exports = {
    PORT: process.env.PORT || 3000,
    USER: process.env.USER || 'root',
    PASSWORD: process.env.PASSWORD || 'root',
    SERVER: process.env.SERVER || 'localhost',
    DB: process.env.DB || 'test',
    SECRET_KEY: process.env.SECRET_KEY || 'secret',
}