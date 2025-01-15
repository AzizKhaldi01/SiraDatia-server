const winston = require('winston');

// Define the log format
const logFormat = winston.format.combine(
  winston.format.timestamp(), // Add timestamp to logs
  winston.format.prettyPrint(), // Format logs for readability
  winston.format.colorize(), // Add colors to logs (for console output)
);

// Set up Winston logger
const logger = winston.createLogger({
  level: 'info', // Default log level
  format: logFormat,
  transports: [
    // Console transport (logs to the console)
    new winston.transports.Console(),

    // File transport (logs to a file)
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

module.exports = logger;
