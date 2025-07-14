const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { xss } = require('express-xss-sanitizer');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false
});

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // In production, you should replace this with your actual domain
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

const setupSecurity = (app) => {
  // Security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"]
      }
    }
  }));

  // CORS
  app.use(cors(corsOptions));

  // Rate limiting
  app.use('/api', limiter);

  // XSS Protection
  app.use(xss());
};

module.exports = setupSecurity;