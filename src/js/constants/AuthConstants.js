
// NOTE will need to update for prod
export const BASE_URL     = 'http://localhost:5000/';
export const SIGNIN_URL   = 'http://localhost:5000/api/v1/signin';
export const SIGNUP_URL   = 'http://localhost:5000/api/v1/signup';
export const SIGNOUT_URL  = 'http://localhost:5000/api/v1/signout';
export const EMAIL_VERIFICATION  = 'http://localhost:5000/api/v1/email_verification';
export const EMAIL_RESET  = 'http://localhost:5000/api/v1/email_reset';
export const CHANGE_PASSWORD  = 'http://localhost:5000/api/v1/change_password';
export const UPDATE_PW = 'http://localhost:5000/api/v1/update_password';
export const AUTH_FACEBOOK = 'http://localhost:5000/api/v1/auth/facebook/callback';
export const JWT_POLL = 'http://localhost:5000/api/v1/verify_auth';
export const JWT_POLL_INTERVAL_MS = 300000; // NOTE 5 mins

export const fbAppId = process.env.NODE_ENV === 'production' ? '1627624840901548' : '1627626620901370';