import dispatcher from "../dispatcher";

// Not Create, edit, update, more like
// support/oppose/refresh

export function getEvents(offset) {
  dispatcher.dispatch({
    type: "FETCH_EVENTS",
    offset,
  });
}
