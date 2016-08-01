
// NOTE will need to update for prod
const BASE_URL    = 'http://localhost:5000/';
var loginUrl      = BASE_URL + 'v1/login';
var signup        = BASE_URL + 'v1/signup';
const LOGIN_USER  = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

module.exports = {
  BASE_URL:    BASE_URL,
  LOGIN_URL:   loginUrl,
  SIGNUP_URL:  signup,
  LOGIN_USER:  LOGIN_USER,
  LOGOUT_USER: LOGOUT_USER
};
