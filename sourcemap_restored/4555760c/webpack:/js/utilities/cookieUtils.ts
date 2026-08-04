import cookie from 'cookie';

export const getCookie = (cookieName: string): string | undefined => {
  const cookieString = document.cookie;
  const cookies = cookie.parse(cookieString);

  return cookies[cookieName] as string | undefined;
};

export const getExpirationDate = (numberOfDaysValid: number): Date => {
  const currentDate = new Date();
  const expirationDate = new Date();

  expirationDate.setDate(currentDate.getDate() + numberOfDaysValid);

  return expirationDate;
};
