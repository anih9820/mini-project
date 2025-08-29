import logger from "../config/logger";

const AuthService = {
  extractUserInfo: (tokenPayload: any) => {
    try {
      const groups = (tokenPayload?.["cognito:groups"] || []) as string[];
      return {
        userId: tokenPayload.sub,
        email: tokenPayload.email,
        issuer: tokenPayload.iss,
        audience: tokenPayload.aud,
        role: groups[0] || "CUSTOMER",
        fullToken: tokenPayload,
      };
    } catch (error) {
      logger.error("Failed to extract user info from token", error);
      throw error;
    }
  },
};

export default AuthService;
