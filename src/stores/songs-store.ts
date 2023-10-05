import { makeAutoObservable } from "mobx";
import { OrderedSongType, PlaylistType, SongType } from "../types";

class SongsStore {
  current_playlist_songs: SongType[] = [];
  liked_songs_ids: number[] = [];

  current_song?: SongType;
  songs_queue: SongType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setLikedSongsIds(playlist: PlaylistType) {
    const ids: number[] = [];

    playlist.songs.forEach((orderedSong: OrderedSongType) => {
      ids.push(orderedSong.song.id);
    });

    this.liked_songs_ids = ids;
  }

  toggleLikedSongId(id: number) {
    if (!this.liked_songs_ids.includes(id)) {
      this.liked_songs_ids.push(id);
      return;
    }
    let newUserLikedSongIds = this.liked_songs_ids.filter(
      (songId) => songId !== id
    );
    this.liked_songs_ids = newUserLikedSongIds;
  }

  setCurrentSong(song: SongType) {
    if (this.current_song) {
      if (this.current_song.id === song.id) return;
    }

    if (song) {
      console.log("song set!");

      this.current_song = song;
    }
  }

  setCurrentSongToNextInQueue() {
    let indexOfSong = -1;

    this.songs_queue.forEach((song, index) => {
      if (song.id === this.current_song?.id) {
        indexOfSong = index;
      }
    });

    if (this.songs_queue.length > 0) {
      let song = this.songs_queue[(indexOfSong + 1) % this.songs_queue.length];

      this.current_song = song;
    }
  }

  setSongQueue(songContext: PlaylistType) {
    let songs_queue: SongType[] = [];
    songContext.songs.forEach((song) => {
      songs_queue.push(song.song);
    });

    this.songs_queue = songs_queue;

    console.log("song queue", this.songs_queue);
  }

  shuffleSongQueue() {
    let array = this.songs_queue;
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    this.songs_queue = array;

    if (this.songs_queue.length > 0) {
      this.setCurrentSong(this.songs_queue[0]);
    }
  }
}

export default new SongsStore();
