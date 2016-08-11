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
