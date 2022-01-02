// ========================================
//                 DATABASE
// ========================================
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config();
}

const USER = process.env.MONGO_USER;
const PASS = process.env.MONGO_PASS;
const SERVER = process.env.MONGO_SRV;

// console.log(USER);
process.env.MONGO_URI = `mongodb+srv://${USER}:${PASS}@${SERVER}/drunk-webstore`;
// console.log(process.env.MONGO_URI);

// ========================================
//                 JWT
// ========================================

process.env.SEED = process.env.SEED || 'development-seed-drunk-webstore';

process.env.TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '24h';