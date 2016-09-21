import dispatcher from "../dispatcher";

export function fetchPoliticianPhotos(politicianId) {
  dispatcher.dispatch({
    type: "FETCH_POLITICIAN_PHOTOS",
    politicianId
  });
}

export function fetchPoliticianPhoto(politicianId, politicianPhotoId) {
  dispatcher.dispatch({
    type: "FETCH_POLITICIAN_PHOTO",
    politicianId,
    politicianPhotoId
  });
}

export function updatePoliticianPhoto(politicianId, politicianPhotoId, politicianPhotoInfo) {
  dispatcher.dispatch({
    type: "UPDATE_POLITICIAN_PHOTO",
    politicianId,
    politicianPhotoId,
    politicianPhotoInfo
  });
}

export function createPoliticianPhoto(politicianId, politicianPhotoInfo) {
  dispatcher.dispatch({
    type: "CREATE_POLITICIAN_PHOTO",
    politicianId,
    politicianPhotoInfo
  });
}

export function deletePoliticianPhoto(politicianId, politicianPhotoId) {
  dispatcher.dispatch({
    type: "DELETE_POLITICIAN_PHOTO",
    politicianId,
    politicianPhotoId
  });
}
