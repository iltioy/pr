import userStore from "../stores/user-store";
import songsStore from "../stores/songs-store";
import axios from "axios";
import { FileInfo } from "../components/modals/SongUploadModal/SongUploadModal";
import { SongType } from "../types";
import playlistsStore from "../stores/playlists-store";

export const toggleLikeSong = async (songId: number) => {
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

export const handleUploadAudio = async (fileInfo: FileInfo) => {
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

export interface UploadSongData {
    name: string;
    author: string;
    album?: string;
    image_key?: string;
    image_url?: string;
}

export const uploadSong = async (uploadInfo: UploadSongData, fileInfo?: FileInfo) => {
    try {
        if (!fileInfo) return;
        const audio_url = await handleUploadAudio(fileInfo);
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

export const getSongFromRadio = async () => {
    try {
        let moodCorreleation = {
            calm: 0,
            cheerful: 0,
            sad: 0,
        };
        let genreCorrelation = {
            hipHop: 0,
            pop: 0,
            rap: 0,
        };
        let languageCorrelation = {
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

        const moodKeys = getTwoKeysWithHighestValues(moodCorreleation);
        console.log(moodKeys, moodCorreleation);
        return;

        const res = await axios.post("/songs/get/radio", {});
    } catch (error) {}
};

const getTwoKeysWithHighestValues = (obj: any) => {
    const keys = Object.keys(obj);

    // Use the keys to get an array of values
    const values = keys.map((key) => obj[key]);

    // Find the indices of the two highest values
    const highestIndices = values.reduce(
        (indices, value, index, arr) => {
            if (value > arr[indices[0]]) {
                indices[1] = indices[0];
                indices[0] = index;
            } else if (value > arr[indices[1]]) {
                indices[1] = index;
            }
            return indices;
        },
        [-1, -1]
    );

    console.log("high", highestIndices);

    // Use the indices to get the keys with the highest values
    const highestKeys = highestIndices.map((index: any) => keys[index]);

    return highestKeys;
};
