import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { AppError } from '../utils/errorUtils.js';

const getUserData = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('transactions');
  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      transactions: user.transactions,
      balance: user.ecoCoins,
    });
  } else {
    res.status(404);
    throw new AppError('User not found', 404);
  }
});

const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username,
  });
  if (!user) {
    next(new AppError('Invalid username', 401));
  }
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    next(new AppError('Invalid password', 401));
  } else {
    const token = user.generateToken();
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  }
});

const signup = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    next(new AppError('Username, Email and Password required!', 400));
  }
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 'USER',
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
  const user = await User.findOne({
    username,
  });
  if (user) {
    const token = user.generateToken();
    res.status(201).json({
      message: 'Signup successful',
      token,
    });
  } else {
    next(new AppError('Invalid user data', 400));
  }
});

export { getUserData, login, signup };
