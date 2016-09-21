import dispatcher from "../dispatcher";

export function getCustomerId() {
  dispatcher.dispatch({
    type: "GET_CUSTOMER_ID"
  });
}

export function setCustomer(cardToken) {
  dispatcher.dispatch({
    type: "SET_CUSTOMER",
    cardToken
  });
}

export function chargeCustomer(chargeDetails) {
  dispatcher.dispatch({
    type: "CHARGE_CUSTOMER",
    chargeDetails
  });
}

export function deleteCustomer(cardToken) {
  dispatcher.dispatch({
    type: "DELETE_CUSTOMER",
    cardToken
  });
}
