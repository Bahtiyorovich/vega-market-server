// middlewares/authenticateMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET_KEY || 'default_secret-key';

const authenticate = (req, res, next) => {
  try {
    let token;

    // 1. Cookie orqali tokenni tekshirish
    if (req.cookies && req.cookies.access_token) {
      token = req.cookies.access_token;
    }
    // 2. Authorization header orqali tokenni tekshirish
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Agar token topilmagan bo'lsa
    if (!token) {
      throw new Error('Token topilmadi');
    }

    // Tokenni tekshirish
    const decoded = jwt.verify(token, jwtSecretKey);

    // Foydalanuvchini so'rov obyekti (req) ga qo'shish
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      error: 'Avtorizatsiya muvaffaqiyatsiz', 
      details: error.message 
    });
  }
};

module.exports = authenticate;
