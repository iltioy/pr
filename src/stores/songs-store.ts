import { makeAutoObservable } from "mobx";
import { Playlist, Song } from "../types";

interface SongPreferences {
    moods: string[];
    languages: string[];
    types: string[];
}

class SongsStore {
    current_playlist_songs: Song[] = [];
    liked_songs: Song[] = [];
    liked_songs_ids: number[] = [];

    current_song?: Song;
    songs_queue: Song[] = [];

    song_preferences: SongPreferences = { moods: [], languages: [], types: [] };
    radio: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLikedSongsIds(playlist: Playlist) {
        const ids: number[] = [];
        const songs: Song[] = [];

        playlist.songs.forEach((song: Song) => {
            ids.push(song.id);
            songs.push(song);
        });

        this.liked_songs = songs;
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

    setCurrentSong(song: Song, radio: boolean) {
        this.radio = radio;

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
            let song =
                this.songs_queue[(indexOfSong + 1) % this.songs_queue.length];

            this.current_song = song;
        }
    }

    clearSongQueue() {
        this.songs_queue = [];
    }

    setSongQueue(songContext: Playlist) {
        let songs_queue: Song[] = [];
        songContext.songs?.forEach((song) => {
            songs_queue.push(song);
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
            this.setCurrentSong(this.songs_queue[0], false);
        }
    }

    searchSongs(query: string) {
        const songs: Song[] = [];
        const songsIds: number[] = [];

        this.liked_songs.forEach((song) => {
            if (song.name.toLowerCase().includes(query.toLowerCase())) {
                songs.push(song);
                songsIds.push(song.id);
            }
        });

        this.liked_songs.forEach((song) => {
            if (
                song.author.toLowerCase().includes(query.toLowerCase()) &&
                !songsIds.includes(song.id)
            ) {
                songs.push(song);
                songsIds.push(song.id);
            }
        });

        return songs;
    }

    setSongPreferences(preferences: SongPreferences) {
        this.song_preferences = preferences;
    }
}

export default new SongsStore();
