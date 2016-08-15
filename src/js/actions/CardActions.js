import dispatcher from "../dispatcher";

export function getCustomerId(email) {
  dispatcher.dispatch({
    type: "GET_CUSTOMER_ID",
    email
  });
}

export function setCustomer(cardToken) {
  dispatcher.dispatch({
    type: "SET_CUSTOMER",
    cardToken
  });
}

// export function getCustomer(cardToken) {
//   dispatcher.dispatch({
//     type: "GET_CUSTOMER",
//     cardToken
//   });
// }