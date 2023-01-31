import { Router } from 'express';
import { isAdmin, isAuthenticated } from '../middlewares/auth.js';
import {
  getCans,
  getCan,
  createCan,
  deleteCan,
  updateCan,
} from '../controllers/canController.js';

const canRouter = Router();

canRouter.get('/', getCans);
canRouter.get('/:id', getCan);
canRouter.post('/', isAuthenticated, isAdmin, createCan);
canRouter.patch('/:id', isAuthenticated, isAdmin, updateCan);
canRouter.delete('/:id', isAuthenticated, isAdmin, deleteCan);

export default canRouter;
