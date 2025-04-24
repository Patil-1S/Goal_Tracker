import Cookies from "js-cookie";

//Set cookies
const EXPIRE_DAY_TOKEN = 1;
export const saveTokensToCookies = (
  accessToken: string,
  refreshToken: string
): void => {
  Cookies.set("access_token", accessToken, {
    path: "/",
    expires: EXPIRE_DAY_TOKEN,
  });

  Cookies.set("refresh_token", refreshToken, {
    path: "/",
    expires: EXPIRE_DAY_TOKEN,
  });
};

const EXPIRE_DAY_USER_DETAILS = 1;
export const saveUserToCookies = (user: Record<string, any>): void => {
  const userString = JSON.stringify(user);

  if (userString.length < 4000) {
    Cookies.set("user_data", userString, {
      path: "/",
      expires: EXPIRE_DAY_USER_DETAILS,
    });
  } else {
    console.error("User object is too large to store in cookies.");
  }
};

//Remove cookies
export const clearTokensFromCookies = (): void => {
  Cookies.remove("access_token", { path: "/" });
  Cookies.remove("refresh_token", { path: "/" });
};

export const clearUserFromCookies = (): void => {
  Cookies.remove("user_data", { path: "/" });
};

//Get cookies
export const getTokenFromCookies = (tokenName: string): string | undefined => {
  return Cookies.get(tokenName);
};

export const getUserFromCookies = (): Record<string, any> | undefined => {
  const userString = Cookies.get("user_data");
  return userString ? JSON.parse(userString) : undefined;
};
