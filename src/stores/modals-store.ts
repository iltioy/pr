import { makeAutoObservable } from "mobx";

class ModalsStore {
  isSongUploadModalActive = false;
  playlistToAddToId?: number;

  snackbarMessage: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  toggleSongUploadModal(playlistToAddToId?: number) {
    this.isSongUploadModalActive = !this.isSongUploadModalActive;

    this.playlistToAddToId = playlistToAddToId;
  }

  setSnackbarMessage(message: string) {
    this.snackbarMessage = message;
  }
}

export default new ModalsStore();
