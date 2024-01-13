const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const APIError = require('./utils/apiError');
const apiLogger = require('./middlewares/auditLogger');
const { genericMessages } = require('./config/httpMessages');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
// routes to the static file for swager api
app.use('/v1/docs', express.static('src/docs/schemas'));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
const corsOptions = {
  origin: config.allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// logging middleware
if (config.logger.enable) {
  app.use((req, res, next) =>
    apiLogger(config.logger.allowedRequestTypes, req, res, next)
  );
}

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new APIError(httpStatus.NOT_FOUND, genericMessages.NOT_FOUND));
});

// convert error to APIError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
