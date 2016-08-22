import dispatcher from "../dispatcher";

export function fetchPacs() {
  dispatcher.dispatch({
    type: "FETCH_PACS"
  })
}

export function fetchPac(pacId) {
  dispatcher.dispatch({
    type: "FETCH_PAC",
    pacId
  })
}

export function updatePac(pacId, pacInfo) {
  dispatcher.dispatch({
    type: "UPDATE_PAC",
    pacId,
    pacInfo
  })
}

export function createPac(pacInfo) {
  dispatcher.dispatch({
    type: "CREATE_PAC",
    pacInfo
  })
}
