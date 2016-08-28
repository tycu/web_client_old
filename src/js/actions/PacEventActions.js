import dispatcher from "../dispatcher";

export function fetchPacEvents(eventId) {
  dispatcher.dispatch({
    type: "FETCH_PAC_EVENTS",
    eventId
  })
}

export function fetchPacEvent(eventId, pacEventId) {
  dispatcher.dispatch({
    type: "FETCH_PAC_EVENT",
    eventId,
    pacEventId
  })
}

export function updatePacEvent(eventId, pacEventId, pacEventInfo) {
  dispatcher.dispatch({
    type: "UPDATE_PAC_EVENT",
    eventId,
    pacEventId,
    pacEventInfo
  })
}

export function createPacEvent(eventId, pacEventInfo) {
  dispatcher.dispatch({
    type: "CREATE_PAC_EVENT",
    eventId,
    pacEventInfo
  })
}

export function deletePacEvent(eventId, pacEventId) {
  dispatcher.dispatch({
    type: "DELETE_PAC_EVENT",
    eventId,
    pacEventId
  })
}