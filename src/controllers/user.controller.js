const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const httpStatus = require('http-status');
const { authMessage } = require('../config/httpMessages');
const moment = require('moment');

const { JWT_SECRET } = process.env;

const createNewUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      userType,
      isActive = true,
      walletBalance,
    } = req.allParams || {};

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: 'User already exist',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userType,
      isActive,
      walletBalance,
    });

    const document = await newUser.save();

    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: 'User registered successfully',
      id: document.id,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
};

// User login
const login = async (req, res) => {
  try {
    const { email, password } = req.allParams || {};

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: 'Invalid Credentials',
      });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: 'Invalid Credentials',
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('access_token', token, {
      //httpOnly: true,
      secure: true,
      sameSite: 'None',
      expires: moment().add(60, 'minutes').toDate(),
    });

    // Send a success response
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: 'Login successful',
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    let { fields = {}, options = {}, id: _id } = req.allParams || {};

    fields = fields || { password: 0 };

    const document = await User.findById(_id, fields, options);
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: document,
    });
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: err.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    let { fields, filter, options } = req.allParams;
    if (options?.search) {
      const searchText =
        typeof options?.search === 'object'
          ? options?.search?.text
          : options?.search;
      let searchFields = options?.search?.fields || ['name', 'email'];
      options.search = { text: searchText, fields: searchFields };
    }
    fields = fields || { password: 0 };

    const result = await User.paginate({ filter, fields, options });

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: result,
    });
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id: _id, context, ...update } = req.allParams || {};

    const { set, unset, push, pull, options = {} } = update;
    const { user: loggedInUser } = context || {};
    const user = await User.findById(_id);

    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: authMessage.USER_NOT_FOUND,
      });
    }

    const updates = { updatedBy: loggedInUser?._id };

    if (set) {
      updates.$set = set;
    }
    if (unset) {
      updates.$unset = unset;
    }
    if (pull) {
      updates.$pull = pull;
    }
    if (push) {
      updates.$push = push;
    }

    const result = await User.findByIdAndUpdate({ _id }, updates, options);
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: authMessage.USER_UPDATED_SUCCESSFULLY,
      id: result._id,
    });
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.allParams || {};
    const result = await User.findOneAndDelete(id);
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: authMessage.DELETE_USRE,
      id: result.id,
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
};

module.exports = {
  createNewUser,
  login,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
