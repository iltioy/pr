import userStore from "../stores/user-store";
import songsStore from "../stores/songs-store";
import axios from "axios";
import { FileInfo } from "../components/modals/SongUploadModal/SongUploadModal";
import { SongType } from "../types";
import playlistsStore from "../stores/playlists-store";

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

            const song: SongType = res.data;
            return song;
        } catch (error) {
            throw error;
        }
    };

    getSongFromRadio = async () => {
        try {
            let moodCorreleation: Record<string, number> = {
                calm: 0,
                cheerful: 0,
                sad: 0,
            };
            let genreCorrelation: Record<string, number> = {
                hipHop: 0,
                pop: 0,
                rap: 0,
            };
            let languageCorrelation: Record<string, number> = {
                russian: 0,
                english: 0,
                nowords: 0,
            };

            playlistsStore.added_playlists.map((playlist) => {
                playlist.songs.map((songInstance) => {
                    const { song } = songInstance;
                    if (song.mood) {
                        moodCorreleation[song.mood] += 1;
                    }

                    if (song.genre) {
                        genreCorrelation[song.genre] += 1;
                    }

                    if (song.language) {
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

            console.log(moodKeys, genreKeys, lanuageKeys);

            const res = await axios.post("/songs/get/radio", {
                genres: genreKeys,
                moods: moodKeys,
                languages: lanuageKeys,
            });

            const song: SongType = res.data;

            songsStore.setCurrentSong(song, true);
        } catch (error) {
            console.log(error);
        }
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
