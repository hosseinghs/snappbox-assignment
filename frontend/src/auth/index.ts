import Cookies from 'js-cookie';

export const setAccessToken = (token: string): void => {
  Cookies.set('access_token', token, {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    httpOnly: false, // Cookies set via JavaScript are not httpOnly
    sameSite: 'strict', // Helps prevent CSRF
    expires: 1, // Expires in 7 days
  });
};

export const getRefreshToken = (): string | undefined => Cookies.get('access_token');
export const removeRefreshToken = (): void => Cookies.remove('access_token')