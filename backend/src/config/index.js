require('dotenv').config();

const config={
    port:process.env.PORT,
    mongoUri: process.env.MONGOURI
}

module.exports={config};