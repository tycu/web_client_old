import dispatcher from "../dispatcher";

export function signInUser(email, password) {
  dispatcher.dispatch({
    type: "SIGN_IN_USER",
    email,
    password
  });
}

export function signUpUser(email, password) {
  dispatcher.dispatch({
    type: "SIGN_UP_USER",
    email,
    password
  });
}

export function signInFacebook(fbResponse) {
  dispatcher.dispatch({
    type: "AUTH_FACEBOOK",
    fbResponse
  });
}

export function signOutUser(token) {
  dispatcher.dispatch({
    type: "SIGN_OUT_USER",
    token
  });
}

export function verifyEmail() {
  dispatcher.dispatch({
    type: "VERIFY_USER_EMAIL"
  });
}

export function resetPassword(email) {
  dispatcher.dispatch({
    type: "RESET_PASSWORD",
    email
  });
}

export function changePassword(oldPassword, password) {
  dispatcher.dispatch({
    type: "CHANGE_PASSWORD",
    oldPassword,
    password
  });
}

export function updatePasswordFromReset(password) {
  dispatcher.dispatch({
    type: "UPDATE_PW_FROM_RESET",
    password
  });
}

export function startJwtPoll() {
  dispatcher.dispatch({
    type: "START_JWT_POLL"
  });
}
