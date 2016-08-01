import dispatcher from "../dispatcher";

export function updateDonorInfo(donorInfo) {
  dispatcher.dispatch({
    type: "UPDATE_DONOR_INFO",
    donorInfo: donorInfo
  })
}
