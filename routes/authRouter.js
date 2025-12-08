import {Router} from "express";

import validateBody from "../helpers/validateBody.js";

import {emailSchema, loginSchema, registerSchema} from "../schemas/authSchemas.js";

import {
    getCurrentController,
    loginController,
    registerController,
    verifyController,
    resendVerifyController,
    logoutController,
    refreshAvatarController
} from "../controllers/authcontrollers.js";

import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerController);

authRouter.get("/verify/:verificationToken", verifyController);

authRouter.post("/verify", validateBody(emailSchema), resendVerifyController);

authRouter.post("/login", validateBody(loginSchema), loginController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutController);

authRouter.patch("/avatars", authenticate, upload.single('avatar'), refreshAvatarController);


export default authRouter;