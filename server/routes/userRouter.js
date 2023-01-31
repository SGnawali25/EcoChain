import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { login, signup, getUserData } from '../controllers/userController.js';
import { addTransaction } from '../controllers/transactionController.js';

const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/signup', signup);
userRouter.get('/profile', isAuthenticated, getUserData);
userRouter.post('/recycle/:id', isAuthenticated, addTransaction);

export default userRouter;
