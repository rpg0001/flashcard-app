import winston from 'winston';
import { DEFAULT_LOG_LEVEL } from './constants';
import { config } from './config';
const { combine, timestamp, printf, colorize, align } = winston.format;

export const logger = winston.createLogger({
    level: config.LOG_LEVEL ?? DEFAULT_LOG_LEVEL,
    format: combine(
        colorize({ all: true }),
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf((log) => `[${log.timestamp}] ${log.level}: ${log.message}`)
      ),
    transports: [new winston.transports.Console()],
});