import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mysql from 'mysql2';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import NoteRouter from './routers/noteRouter';
import UserRouter from './routers/userRouter';
import AuthRouter from './routers/authRouter';
import { logger } from './utils/logger';
import { config } from './utils/config';
import { DEFAULT_LOG_LEVEL, DEFAULT_PORT } from './utils/constants';
import { requireAuth } from './middleware/requireAuth';
import { requireAdmin } from './middleware/requireAdmin';
const errorHandler = require('./middleware/errorHandler');

// Validate config
require('./utils/config');

const app = express();
const port = config.PORT ?? DEFAULT_PORT;

// Middleware
if (config.NODE_ENV === 'development') {
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
}
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('tiny', { 
  stream: { 
    write: (message: string) => logger.http(message.trim()) 
  }
}));

// Connect to DB
export const connection = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
}).promise();

// Health check route
app.get('/api', (req, res) => res.status(200).json('OK'));

// Public routers
app.use("/api/auth", AuthRouter);

// Protected routers
app.use("/api/notes", requireAuth, NoteRouter);
app.use("/api/users", requireAuth, requireAdmin, UserRouter);

// Custom error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
  logger.info(`Express is listening at http://localhost:${port}`);
  logger.info(`Log level: ${config.LOG_LEVEL ?? DEFAULT_LOG_LEVEL}`)
});