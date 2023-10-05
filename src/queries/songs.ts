import userStore from "../stores/user-store";
import songsStore from "../stores/songs-store";
import axios from "axios";
import { FileInfo } from "../components/modals/SongUploadModal/SongUploadModal";
import { SongType } from "../types";

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
        console.log(error);
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
        console.log(error);
    }
};
