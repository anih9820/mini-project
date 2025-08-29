import { Request, Response } from "express";
import constants from "../../../constants/generalConstants";
import logger from "../../../config/logger";
import SharedResponses from "../../../shared/sharedResponses";
import AuthService from "../../../services/AuthService";

const getUserInfo = async (req: Request, res: Response) => {
  try {
    const decodedUser = (req as any).user;
    const userInfo = AuthService.extractUserInfo(decodedUser);

    res.status(constants.HTTP_STATUS_CODES.SUCCESS).send(userInfo);
  } catch (error: any) {
    logger.error("ERROR in BFF when retrieving user info:", error);
    SharedResponses.ErrorResponse(
      res,
      constants.HTTP_STATUS_CODES.ERROR,
      "Failed to retrieve user info",
      error?.message || "Something went wrong"
    );
  }
};

const AuthController = {
  getUserInfo,
};

export default AuthController;
