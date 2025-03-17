import userStore from "../stores/user-store";
import axios from "axios";
import { FileInfo } from "../components/modals/SongUploadModal/SongUploadModal";
import { Song } from "../types";
import songsStore from "../stores/songs-store";
import playlistsStore from "../stores/playlists-store";
import { UpdateSongInfoProps } from "../components/modals/SongEdit/SongEditModal";

export interface UploadSongData {
    name: string;
    author: string;
    album?: string;
    image_key?: string;
    image_url?: string;
}

class SongsQueries {
    toggleLikeSong = async (songId: number) => {
        try {
            await axios.patch(
                `/songs/favorite/add/${songId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userStore.access_token}`,
                    },
                }
            );

            songsStore.toggleLikedSongId(songId);
        } catch (error) {
            console.log(error);
        }
    };

    handleUploadAudio = async (fileInfo: FileInfo) => {
        try {
            if (!fileInfo || !fileInfo.file) return;
            const audioFromData = new FormData();
            audioFromData.append("audio", fileInfo.file);

            const res = await axios.post("/files/audio/upload", audioFromData, {
                headers: {
                    Authorization: `Bearer ${userStore.access_token}`,
                },
            });

            if (!res.data) return;
            const audio_url: string = res.data.aduio_url;
            return audio_url;
        } catch (error) {
            throw error;
        }
    };

    uploadSong = async (uploadInfo: UploadSongData, fileInfo?: FileInfo) => {
        try {
            if (!fileInfo) return;
            const audio_url = await this.handleUploadAudio(fileInfo);
            if (!audio_url) return;

            const res = await axios.post(
                "/songs/create",
                {
                    name: uploadInfo.name,
                    url: audio_url,
                    author: uploadInfo.author,
                    album: uploadInfo.album,
                    image_key: uploadInfo.image_key,
                    image_url: uploadInfo.image_url,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userStore.access_token}`,
                    },
                }
            );

            const song: Song = res.data;
            return song;
        } catch (error) {
            throw error;
        }
    };

    updateSong = async (updateSongInfo: UpdateSongInfoProps) => {
        try {
            const res = await axios.patch(
                `/songs/update/${updateSongInfo.id}`,
                {
                    name: updateSongInfo.name,
                    image_url: updateSongInfo.image_url,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userStore.access_token}`,
                    },
                }
            );

            const song: Song = res.data;
            return song;
        } catch (error) {
            throw error;
        }
    };

    getSongFromRadio = async () => {
        try {
            const { languages, moods } = songsStore.song_preferences;

            let moodCorreleation: Record<string, number> = {
                calm: moods.includes("Спокойное") ? 1 : 0,
                cheerful:
                    moods.includes("Бодрое") || moods.includes("Весёлое")
                        ? 1
                        : 0,
                sad: moods.includes("Грустное") ? 1 : 0,
            };
            let genreCorrelation: Record<string, number> = {
                hipHop: 0,
                pop: 0,
                rap: 0,
            };
            let languageCorrelation: Record<string, number> = {
                russian: languages.includes("Русский") ? 1 : 0,
                english: languages.includes("Иностранный") ? 1 : 0,
                nowords: languages.includes("Без слов") ? 1 : 0,
            };

            playlistsStore.added_playlists.map((playlist) => {
                playlist.songs.map((song) => {
                    if (song.mood && moods.length === 0) {
                        moodCorreleation[song.mood] += 1;
                    }

                    if (song.genre) {
                        genreCorrelation[song.genre] += 1;
                    }

                    if (song.language && languages.length === 0) {
                        languageCorrelation[song.language] += 1;
                    }
                });
            });

            const moodKeys =
                this.findTwoKeysWithHighestValues(moodCorreleation);
            const genreKeys =
                this.findTwoKeysWithHighestValues(genreCorrelation);
            const lanuageKeys =
                this.findTwoKeysWithHighestValues(languageCorrelation);

            const res = await axios.post(
                "/songs/get/radio",
                {
                    genres: genreKeys,
                    moods: moodKeys,
                    languages: lanuageKeys,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userStore.access_token}`,
                    },
                }
            );

            const song: Song = res.data;

            songsStore.setCurrentSong(song, true);
        } catch (error) {
            console.log(error);
        }
    };

    blacklistSong = async (songId: number) => {
        return axios.post(
            `/songs/blacklist/${songId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${userStore.access_token}`,
                },
            }
        );
    };

    findTwoKeysWithHighestValues(obj: Record<string, number>): string[] {
        // Get an array of entries from the object
        const entries: [string, number][] = Object.entries(obj);

        // Sort the entries based on values in descending order
        entries.sort((a, b) => b[1] - a[1]);

        // Return an array containing the two keys with the highest values
        return [entries[0][0], entries[1][0]];
    }
}

export default new SongsQueries();
