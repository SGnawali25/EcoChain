import asyncHandler from 'express-async-handler';
import GarbageCan from '../models/garbageCanModel.js';
import { AppError } from '../utils/errorUtils.js';

const getCans = asyncHandler(async (req, res, next) => {
  const cans = await GarbageCan.find({});
  res.status(200).json({
    status: 'success',
    data: cans,
  });
});

const getCan = asyncHandler(async (req, res, next) => {
  const can = await GarbageCan.findById(req.params.id);
  if (can) {
    res.json(can);
  } else {
    res.status(404);
    throw new AppError('Garbage can not found', 404);
  }
});

const createCan = asyncHandler(async (req, res, next) => {
  const can = await GarbageCan.create(req.body);
  res.status(201).json(can);
});

const deleteCan = asyncHandler(async (req, res, next) => {
  const can = await GarbageCan.findByIdAndDelete(req.params.id);
  if (can) {
    res.json(can);
  } else {
    throw new AppError('Garbage can not found', 404);
  }
});

const updateCan = asyncHandler(async (req, res, next) => {
  const can = await GarbageCan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (can) {
    res.json(can);
  } else {
    throw new AppError('Garbage can not found', 404);
  }
});

export { getCans, getCan, createCan, deleteCan, updateCan };
