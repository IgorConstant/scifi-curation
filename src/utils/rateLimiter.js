import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,                  // máximo de 100 requisições por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Você excedeu o limite de requisições. Tente novamente mais tarde.'
});

export default limiter;
