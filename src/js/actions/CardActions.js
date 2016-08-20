import dispatcher from "../dispatcher";

export function getCustomerId(stripePublicKey) {
  dispatcher.dispatch({
    type: "GET_CUSTOMER_ID",
    stripePublicKey
  });
}

export function setCustomer(cardToken) {
  dispatcher.dispatch({
    type: "SET_CUSTOMER",
    cardToken
  });
}

export function deleteCustomer(cardToken) {
  dispatcher.dispatch({
    type: "DELETE_CUSTOMER",
    cardToken
  });
}
