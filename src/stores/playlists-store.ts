import { makeAutoObservable } from "mobx";
import { OrderedPlaylist, PlaylistType } from "../types";
import songsStore from "./songs-store";

class PlaylistsStore {
  added_playlists: PlaylistType[] = [];
  liked_playlists: PlaylistType[] = [];

  user_added_playlists: PlaylistType[] = [];
  user_liked_playlists: PlaylistType[] = [];

  user_added_playlists_ids: number[] = [];
  user_liked_playlists_ids: number[] = [];

  user_favorite_playlist?: PlaylistType | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setAddedPlaylists(data: any) {
    const ordered_added_playlists: OrderedPlaylist[] | undefined =
      data?.added_playlists;
    let added_playlists: PlaylistType[] = [];
    if (!ordered_added_playlists) return;
    ordered_added_playlists?.forEach((orderedPlaylist) => {
      added_playlists.push(orderedPlaylist.playlist);
    });

    this.added_playlists = added_playlists;
  }

  setLikedPlaylists(data: any) {
    const ordered_liked_playlists: OrderedPlaylist[] | undefined =
      data?.liked_playlists;
    if (!ordered_liked_playlists) return;
    let liked_playlists: PlaylistType[] = [];
    ordered_liked_playlists?.forEach((orderedPlaylist) => {
      liked_playlists.push(orderedPlaylist.playlist);
    });

    this.liked_playlists = liked_playlists;
  }

  setUserPlaylists(data: any) {
    const ordered_added_playlists: OrderedPlaylist[] | undefined =
      data?.added_playlists;
    let added_playlists: PlaylistType[] = [];
    ordered_added_playlists?.forEach((orderedPlaylist) => {
      added_playlists.push(orderedPlaylist.playlist);
    });

    const ordered_liked_playlists: OrderedPlaylist[] | undefined =
      data?.liked_playlists;
    let liked_playlists: PlaylistType[] = [];
    ordered_liked_playlists?.forEach((orderedPlaylist) => {
      liked_playlists.push(orderedPlaylist.playlist);
    });

    let added_playlists_ids: number[] = [];
    let liked_playlists_ids: number[] = [];
    added_playlists.forEach((el) => {
      added_playlists_ids.push(el.id);
    });

    liked_playlists.forEach((el) => {
      liked_playlists_ids.push(el.id);
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

  setFavoritePlaylist(playlists: PlaylistType[]) {
    let favoritePlaylist: PlaylistType | undefined;

    playlists.forEach((el: PlaylistType) => {
      if (el.is_favorite) {
        favoritePlaylist = el;
      }
    });

    this.user_favorite_playlist = favoritePlaylist;

    if (favoritePlaylist) {
      songsStore.setLikedSongsIds(favoritePlaylist);
    }
  }
}

export default new PlaylistsStore();
