import dispatcher from "../dispatcher";

export function fetchEvents(offset) {
  dispatcher.dispatch({
    type: "FETCH_EVENTS",
    offset,
  });
}

export function fetchAdminEvents(offset) {
  dispatcher.dispatch({
    type: "FETCH_ADMIN_EVENTS",
    offset,
  });
}

export function fetchEvent(eventId) {
  dispatcher.dispatch({
    type: "FETCH_EVENT",
    eventId
  })
}

export function fetchAdminEvent(eventId) {
  dispatcher.dispatch({
    type: "FETCH_ADMIN_EVENT",
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

export function pinEvent(eventId) {
  dispatcher.dispatch({
    type: "PIN_EVENT",
    eventId
  })
}

export function setBreakingNews(eventId) {
  dispatcher.dispatch({
    type: "SET_BREAKING_NEWS_EVENT",
    eventId
  })
}

export function unsetBreakingNews() {
  dispatcher.dispatch({
    type: "UNSET_BREAKING_NEWS_EVENT"
  })
}

export function fetchBreakingEvent() {
  dispatcher.dispatch({
    type: "FETCH_BREAKING_EVENT"
  })
}

export function togglePublish(eventId) {
  dispatcher.dispatch({
    type: "TOGGLE_PUBLISH_EVENT",
    eventId
  })
}

export function createEvent(eventInfo) {
  dispatcher.dispatch({
    type: "CREATE_EVENT",
    eventInfo
  })
}
