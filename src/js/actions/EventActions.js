import dispatcher from "../dispatcher";

export function fetchEvents(offset) {
  dispatcher.dispatch({
    type: "FETCH_EVENTS",
    offset,
  });
}

export function fetchEvent(eventId) {
  dispatcher.dispatch({
    type: "FETCH_EVENT",
    eventId
  })
}

export function updateEvent(eventId, eventInfo) {
  dispatcher.dispatch({
    type: "UPDATE_EVENT",
    eventId,
    eventInfo
  })
}

export function createEvent(eventInfo) {
  dispatcher.dispatch({
    type: "CREATE_EVENT",
    eventInfo
  })
}
