import { makeAutoObservable } from "mobx";

class ModalsStore {
    isSongUploadModalActive = false;
    playlistToAddToId?: number;

    constructor() {
        makeAutoObservable(this);
    }

    toggleSongUploadModal(playlistToAddToId?: number) {
        this.isSongUploadModalActive = !this.isSongUploadModalActive;

        this.playlistToAddToId = playlistToAddToId;
    }
}

export default new ModalsStore();
