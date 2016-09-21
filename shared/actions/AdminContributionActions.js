import dispatcher from "../dispatcher";

export function fetchAdminContributions(offset) {
  dispatcher.dispatch({
    type: "FETCH_ADMIN_CONTRIBUTIONS",
    offset
  });
}

export function fetchEventContributionSum(eventId) {
  dispatcher.dispatch({
    type: "FETCH_EVENT_CONTRIBUTION_SUM",
    eventId
  });
}