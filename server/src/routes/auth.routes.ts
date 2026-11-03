import { Router } from "express";
import { signupController } from "../controllers/auth/signup.controller.js";
import { signinController } from "../controllers/auth/signin.controller.js";

const router = Router();

router.post("/signup",  signupController);
router.post("/signin",  signinController);

export default router;
