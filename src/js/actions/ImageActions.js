import dispatcher from "../dispatcher";

export function uploadImage(file) {
  dispatcher.dispatch({
    type: "UPLOAD_IMAGE",
    file,
  });
}