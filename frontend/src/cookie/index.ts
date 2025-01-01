import Cookies from 'js-cookie';

const TOKEN_NAME = 'access_token'

export const setAccessToken = (token: string): void => {
  Cookies.set(TOKEN_NAME, token, {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: false, // Cookies set via JavaScript are not httpOnly
    sameSite: 'strict', // Helps prevent CSRF
    expires: 1, // Expires in 7 days
  });
};

export const getAccessToken = (): string | undefined => Cookies.get(TOKEN_NAME);
export const removeAccessToken = (): void => Cookies.remove(TOKEN_NAME)