import decodeJWT from 'jwt-decode';

/**
 * Check if the jwt token is expired or not
 */
export const isValidToken = (token: string) => {
    // verify if token exists
    if (!token) return false;

    // verify that token hasn't expired
    const claims = (decodeJWT(token) as any);
    const expirationTimeInMilliSeconds = claims.exp * 1000
    return Date.now() < expirationTimeInMilliSeconds;
}
