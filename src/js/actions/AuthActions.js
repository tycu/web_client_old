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
