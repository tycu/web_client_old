import dispatcher from "../dispatcher";

export function uploadImage(offset) {
  dispatcher.dispatch({
    type: "UPLOAD_IMAGE",
    offset,
  });
}