import dispatcher from "../dispatcher";

export function updateDonorInfo(userId, donorInfo) {
  dispatcher.dispatch({
    type: "UPDATE_DONOR_INFO",
    userId: userId,
    donorInfo: donorInfo
  })
}

export function fetchDonorInfo(userId) {
  dispatcher.dispatch({
    type: "FETCH_DONOR_INFO",
    userId,
  })
}

