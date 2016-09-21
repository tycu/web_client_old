import dispatcher from "../dispatcher";

export function fetchPoliticians() {
  dispatcher.dispatch({
    type: "FETCH_POLITICIANS"
  });
}

export function fetchPolitician(politicianId) {
  dispatcher.dispatch({
    type: "FETCH_POLITICIAN",
    politicianId
  });
}

export function updatePolitician(politicianId, politicianInfo) {
  dispatcher.dispatch({
    type: "UPDATE_POLITICIAN",
    politicianId,
    politicianInfo
  });
}

export function createPolitician(politicianInfo) {
  dispatcher.dispatch({
    type: "CREATE_POLITICIAN",
    politicianInfo
  });
}
