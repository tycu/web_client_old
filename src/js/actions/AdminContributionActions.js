import dispatcher from "../dispatcher";

export function fetchAdminContributions(offset) {
  dispatcher.dispatch({
    type: "FETCH_ADMIN_CONTRIBUTIONS",
    offset
  });
}