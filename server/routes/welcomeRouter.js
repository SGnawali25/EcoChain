import { Router } from 'express';
const welcomeRouter = Router();


welcomeRouter.route("/").get((req, res, next)=>{
    res.status(200).json({
        success: true,
        message: "Welcome to the EcoChain Backend API"
    })
});

export default welcomeRouter;