import * as ImageActions from "../actions/ImageActions";

export function clickToAddFile(e) {
  e.preventDefault();
  fileInput.click();
}

export function upLoadFile(e) {
  e.preventDefault();
  const that = this;

  if (!e.target.files) {
    return;
  }

  const file = e.target.files[0]
  if (!file) {
    return;
  }
  image.src = '';
  ImageActions.uploadImage(file);
}
