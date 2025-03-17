import { makeAutoObservable } from "mobx";
import { Playlist, Song } from "../types";

class ModalsStore {
    isSongUploadModalActive = false;
    playlistToAddTo?: Playlist;

    isSongUpdateModalActive = false;
    songToEdit: Song = {
        author: "",
        id: -1,
        image_url: "",
        name: "",
        owner: {},
        url: "",
    };
    invalidate: string | null = null;

    isSongAddToPlaylistModalActive = false;
    songToAddToPlaylist?: Song;

    constructor() {
        makeAutoObservable(this);
    }

    toggleSongUploadModal(playlistToAddToId?: Playlist) {
        this.isSongUploadModalActive = !this.isSongUploadModalActive;

        this.playlistToAddTo = playlistToAddToId;
    }

    toggleSongUpdateModal(song?: Song, invalidate?: string) {
        if (song) {
            this.songToEdit = song;
        }

        if (invalidate) {
            this.invalidate = invalidate;
        }

        this.isSongUpdateModalActive = !this.isSongUpdateModalActive;
    }

    toggleSongAddToPlaylistModal(song?: Song) {
        this.songToAddToPlaylist = song;

        this.isSongAddToPlaylistModalActive =
            !this.isSongAddToPlaylistModalActive;
    }
}

export default new ModalsStore();
