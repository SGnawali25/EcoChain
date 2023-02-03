import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { AppError } from '../utils/errorUtils.js';

const toFixed = (num, fixed) => {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
};

const getUserData = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: 'transactions',
    options: { sort: { createdAt: -1 } },
  });
  const transactionPerPage = 5;
  const transactionCount = Math.ceil(
    user.transactions.length / transactionPerPage
  );
  let page = parseInt(req.query.p);
  if (!page) {
    page = 1;
  }
  if (page > transactionCount) {
    page = transactionCount;
  }
  if (user) {
    const totalWasteRecycled = toFixed(
      user.transactions.reduce((acc, item) => acc + item.wasteRecycled, 0),
      3
    );
    const totalCoinsEarned = toFixed(
      user.transactions.reduce((acc, item) => acc + item.coinsAwarded, 0),
      3
    );
    res.status(200).json({
      _id: user._id,
      username: user.username,
      transactions: user.transactions.slice(
        page * transactionPerPage - transactionPerPage,
        page * transactionPerPage
      ),
      totalWasteRecycled,
      totalCoinsEarned,
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
