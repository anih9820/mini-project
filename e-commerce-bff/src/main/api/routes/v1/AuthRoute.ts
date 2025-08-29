import express from "express";
import { authenticate } from "../../../middleware/authMiddleware";
import AuthController from "../../controllers/v1/AuthController";

const router = express.Router();

router.get("/auth/user-info", authenticate, AuthController.getUserInfo);

const AuthRoute = {
  router,
};

export default AuthRoute;
