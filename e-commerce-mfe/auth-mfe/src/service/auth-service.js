import { Amplify, Auth } from "aws-amplify";
import { amplifyConfig } from "../config/amplifyConfig";

Amplify.configure(amplifyConfig);

export const registerUser = async ({ fullName, email, password }) => {
  try {
    return await Auth.signUp({
      username: fullName, 
      password,
      attributes: {
        email, 
        name: fullName, 
      },
    });
  } catch (err) {
    log.error("Error registering user:", err);
    throw err;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await Auth.signIn(email, password);
    const session = await Auth.currentSession();
    const idToken = session.getIdToken().getJwtToken();

    localStorage.setItem("token", idToken);
    return { token: idToken };
  } catch (err) {
    log.error("Error logging in user:", err);
    throw err;
  }
};

export const logoutUser = async () => {
  try {
    await Auth.signOut();
    localStorage.removeItem("token");
  } catch (err) {
    log.error("Error logging out user:", err);
    throw err;
  }
};
