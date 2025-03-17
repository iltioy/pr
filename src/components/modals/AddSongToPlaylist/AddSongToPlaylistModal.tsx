import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../root-store-context";
import { Playlist, Song } from "../../../types";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import PlaylistAddItem from "./PlaylistAddItem";
import PlaylistQueries from "../../../queries/playlists";

export interface UpdateSongInfoProps {
    name: string;
    author: string;
    album: string;
    id: string | number;
    image_url: string;
}

const AddSongToPlaylistModal = observer(() => {
    const { modalsStore, userStore } = useStores();
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        getPlaylists();
    }, []);

    const getPlaylists = async () => {
        try {
            const me = await axios.get("users/get/me", {
                headers: {
                    Authorization: `Bearer ${userStore.access_token}`,
                },
            });

            if (!me.data || !me.data.added_playlists) return;
            const playlists: [] = me.data.added_playlists;

            if (
                !modalsStore.songToAddToPlaylist ||
                !modalsStore.songToAddToPlaylist?.id
            )
                return false;
            const songId = modalsStore.songToAddToPlaylist.id;

            const newPlaylists: Playlist[] = playlists.filter(
                (playlist: Playlist) => {
                    const songsIds = playlist.songs.map(
                        (song: Song) => song.id
                    );

                    return !songsIds.includes(songId);
                }
            );

            setPlaylists(newPlaylists);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddSongToPlaylist = async (playlistId: number) => {
        if (!modalsStore.songToAddToPlaylist) return;
        const res = await PlaylistQueries.addSongToPlaylist(
            playlistId,
            modalsStore.songToAddToPlaylist.id
        );

        if (res) {
            enqueueSnackbar("Трек добавлен в плейлист", {
                variant: "success",
                autoHideDuration: 3000,
            });
        } else {
            enqueueSnackbar("Не удалось добавить трек в плейлист", {
                variant: "error",
                autoHideDuration: 3000,
            });
        }

        modalsStore.toggleSongAddToPlaylistModal();
    };

    const { enqueueSnackbar } = useSnackbar();

    return (
        <>
            <Stack
                position="absolute"
                color="text.primary"
                // bottom="0px"
                width="100%"
                height="100%"
                top="0"
                bottom="0"
                left="0"
                right="0"
                bgcolor="rgb(0,0,0)"
                zIndex={20}
                overflow="hidden"
                sx={{
                    opacity: 0.7,
                }}
            />

            <Stack
                position="absolute"
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                zIndex={21}
                onClick={() => modalsStore.toggleSongAddToPlaylistModal()}
                color="text.primary"
            >
                <Stack
                    width="400px"
                    height="380px"
                    bgcolor="custom.bg.main"
                    borderRadius="10px"
                    justifyContent="center"
                    alignItems="center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Stack
                        width="350px"
                        height="330px"
                        flexDirection="column"
                        overflow="auto"
                    >
                        {playlists.map((playlist) => {
                            return (
                                <PlaylistAddItem
                                    playlist={playlist}
                                    handleAddSongToPlaylist={
                                        handleAddSongToPlaylist
                                    }
                                />
                            );
                        })}
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
});

export default AddSongToPlaylistModal;
