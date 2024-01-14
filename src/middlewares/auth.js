const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { roleRights } = require('../config/roles');
const { authMessage } = require('../config/httpMessages');
const APIError = require('../utils/apiError');
const { Customer, Staff } = require('../models');
const logger = require('../config/logger');
const httpStatus = require('http-status');

const verifyToken = async (req, res, cb) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({
      status: httpStatus.UNAUTHORIZED,
      message: authMessage.UNAUTHORIZED,
    });
  }

  try {
    const decoded = jwt.verify(accessToken, config.jwt.secret);
    if (decoded.type !== 'access') {
      return res.status(401).json({
        status: httpStatus.UNAUTHORIZED,
        message: authMessage.INVALID_TOKEN,
      });
    }

    let user = {};
    if (decoded.isStaff) {
      user = await Staff.findById(decoded.sub);
    } else {
      user = await Customer.findById(decoded.sub);
    }

    if (!user) {
      return res.status(401).json({
        status: httpStatus.UNAUTHORIZED,
        message: authMessage.UNAUTHORIZED,
      });
    }
    const userObject = user.toObject();
    const context = {
      user: {
        ...userObject,
        isStaff: decoded.isStaff,
      },
    };
    req.context = context;

    cb();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: httpStatus.UNAUTHORIZED,
        message: authMessage.SESSION_EXPIRED,
      });
    }

    logger.error(error);
    return res.status(401).json({
      status: httpStatus.UNAUTHORIZED,
      message: authMessage.UNAUTHORIZED,
    });
  }
};
const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return verifyToken(req, res, async () => {
      try {
        if (requiredRights.length) {
          const userRights = roleRights.get(req?.context?.user?.userType);
          const hasRequiredRights = requiredRights.some((requiredRight) => {
            return userRights.includes(requiredRight);
          });

          if (
            !hasRequiredRights &&
            req.params.userId !== req?.context?.user.id
          ) {
            throw new APIError(403, authMessage.FORBIDDEN);
          }
        }
        next();
      } catch (error) {
        next(error);
      }
    });
  };

module.exports = { auth };
