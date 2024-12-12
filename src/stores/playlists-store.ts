import { makeAutoObservable } from "mobx";
import { Playlist } from "../types";
import songsStore from "./songs-store";

class PlaylistsStore {
    added_playlists: Playlist[] = [];
    liked_playlists: Playlist[] = [];

    user_added_playlists: Playlist[] = [];
    user_liked_playlists: Playlist[] = [];

    user_added_playlists_ids: number[] = [];
    user_liked_playlists_ids: number[] = [];

    user_favorite_playlist?: Playlist | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setAddedPlaylists(data: any) {
        const added_playlists: Playlist[] | undefined = data?.added_playlists;
        if (!added_playlists) return;

        this.added_playlists = added_playlists;
    }

    setLikedPlaylists(data: any) {
        const liked_playlists: Playlist[] | undefined = data?.liked_playlists;
        if (!liked_playlists) return;

        this.liked_playlists = liked_playlists;
    }

    setUserPlaylists(data: any) {
        const added_playlists: Playlist[] | undefined = data?.added_playlists;

        const liked_playlists: Playlist[] | undefined = data?.liked_playlists;

        console.log({ data });

        if (!added_playlists || !liked_playlists) return;

        let added_playlists_ids: number[] = [];
        let liked_playlists_ids: number[] = [];
        added_playlists?.forEach((el) => {
            if (el) {
                added_playlists_ids.push(el.id);
            }
        });

        liked_playlists?.forEach((el) => {
            if (el) {
                liked_playlists_ids.push(el.id);
            }
        });

        this.setFavoritePlaylist(added_playlists);

        this.user_added_playlists = added_playlists;
        this.user_liked_playlists = liked_playlists;

        this.user_added_playlists_ids = added_playlists_ids;
        this.user_liked_playlists_ids = liked_playlists_ids;
    }

    toggleLikedPlaylistId(id: number) {
        if (!this.user_liked_playlists_ids.includes(id)) {
            this.user_liked_playlists_ids.push(id);
            return;
        }
        let newUserLikedPlaylistIds = this.user_liked_playlists_ids.filter(
            (playlistId) => playlistId !== id
        );
        this.user_liked_playlists_ids = newUserLikedPlaylistIds;
    }

    setFavoritePlaylist(playlists: Playlist[]) {
        let favoritePlaylist: Playlist | undefined;

        playlists.forEach((el: Playlist) => {
            if (el && el.is_favorite) {
                favoritePlaylist = el;
            }
        });

        this.user_favorite_playlist = favoritePlaylist;

        console.log({ favoritePlaylist });

        if (favoritePlaylist) {
            songsStore.setLikedSongsIds(favoritePlaylist);
        }
    }
}

export default new PlaylistsStore();
