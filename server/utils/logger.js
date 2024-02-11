import winston from 'winston';

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.label({ label: 'user-service' }),
        winston.format.printf(({ level, message,name,code,stack ,label, timestamp }) => {
            return `${timestamp} [${label}] ${level}: ${message} : ${name} : ${code} : ${stack}`;
        })
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
});

export default logger;