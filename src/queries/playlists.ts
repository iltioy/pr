import axios from "axios";
import playlistsStore from "../stores/playlists-store";
import userStore from "../stores/user-store";
import { appQueryClient as queryClient } from "..";
import { Song } from "../types";
import { CAHRT_GLOBAL_TRENDS_NAME } from "../constants/admin";

class PlaylistQueries {
    toggleFavoritePlaylist = async (playlistId: number, username?: string) => {
        try {
            await axios.patch(
                `/playlists/favorite/toggle/${playlistId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userStore.access_token}`,
                    },
                }
            );

            playlistsStore.toggleLikedPlaylistId(playlistId);

            if (username) {
                queryClient.invalidateQueries({
                    queryKey: ["playlists", username],
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    addSongToPlaylist = async (playlistId: number, songId: string | number) => {
        try {
            const res = await axios.patch(
                `/playlists/${playlistId}/song/add/${songId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userStore.access_token}`,
                    },
                }
            );

            queryClient.invalidateQueries({
                queryKey: ["playlist", String(playlistId)],
            });

            return res;
        } catch (error) {
            console.log(error);
        }
    };

    removeSongFromPlaylist = async (
        playlistId: number,
        songId: string | number
    ) => {
        try {
            await axios.patch(
                `/playlists/${playlistId}/song/remove/${songId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userStore.access_token}`,
                    },
                }
            );

            queryClient.invalidateQueries({
                queryKey: ["playlist", String(playlistId)],
            });
            queryClient.invalidateQueries(CAHRT_GLOBAL_TRENDS_NAME);
        } catch (error) {
            console.log(error);
        }
    };

    reorderPlaylist = async (playlistId: number, songs: Song[]) => {
        try {
            await axios.patch(
                `/playlists/reorder/${playlistId}/`,
                {
                    songs,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userStore.access_token}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    createPlaylist = (isAlbum?: boolean) => {
        return axios.post(
            "/playlists/create",
            {
                is_album: isAlbum,
            },
            {
                headers: {
                    Authorization: `Bearer ${userStore.access_token}`,
                },
            }
        );
    };

    deletePlaylist = (id: number) => {
        return axios.delete(`/playlists/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${userStore.access_token}`,
            },
        });
    };
}

export default new PlaylistQueries();
