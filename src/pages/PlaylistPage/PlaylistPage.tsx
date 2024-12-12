import { Stack, Menu, MenuItem, Skeleton } from "@mui/material";
import "./playlistPage.styles.css";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistSongs from "./PlaylistSongs";
import useMenu from "../../hooks/useMenu";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Song, Playlist } from "../../types";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { FRONTEND_URL } from "../../config";
import useCopy from "../../hooks/useCopy";
import PlaylistQueries from "../../queries/playlists";
import { enqueueSnackbar } from "notistack";
import ConfirmationModal from "../../components/modals/ConfirmationModal";

const PlaylistPage = observer(() => {
    const { playlistId } = useParams();
    const [songs, setSongs] = useState<Song[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigage = useNavigate();

    const extractSongsFromOrderdSongs = (playlist?: Playlist) => {
        if (!playlist) return;

        console.log({ playlist });

        setSongs(playlist.songs);
    };

    const { data: playlist, isLoading } = useQuery(
        ["playlist", playlistId],
        () => {
            return axios.get(`/playlists/${playlistId}`);
        },
        {
            select: (data) => {
                const playlist: Playlist = data.data;
                return playlist;
            },
            onSuccess: (data) => {
                extractSongsFromOrderdSongs(data);
            },
            refetchOnWindowFocus: false,
        }
    );

    const { mutate: deletePalylist } = useMutation(
        () => {
            return PlaylistQueries.deletePlaylist(Number(playlistId));
        },
        {
            onSuccess: () => {
                enqueueSnackbar(`Плейлист ${playlist?.name} удалён!`, {
                    variant: "success",
                    autoHideDuration: 3000,
                });
                navigage(`/${playlist?.owner.username}/playlists`);
            },
        }
    );

    const { copy } = useCopy(
        `${FRONTEND_URL}/${playlist?.owner.username}/playlist/${playlist?.id}`
    );

    const {
        anchorElement: playlistSettingsAnchorElement,
        handleClose: handleClosePlaylistSettings,
        handleOpen: handleOpenPlaylistSettings,
        isOpen: isPlaylistSettingOpen,
    } = useMenu();

    return (
        <Stack
            height="100%"
            flexDirection="column"
            bgcolor="custom.bg.main"
            overflow="auto"
            paddingBottom="50px"
        >
            <Navbar />

            <Stack flexDirection="column">
                <PlaylistHeader
                    handleOpenPlaylistSettings={handleOpenPlaylistSettings}
                    playlist={playlist}
                    isLoading={isLoading}
                />

                <PlaylistSongs
                    playlist={playlist}
                    data={songs}
                    isLoading={isLoading}
                />
            </Stack>
            <Menu
                open={isPlaylistSettingOpen}
                anchorEl={playlistSettingsAnchorElement}
                onClose={handleClosePlaylistSettings}
                anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom",
                }}
                transformOrigin={{
                    horizontal: "center",
                    vertical: "top",
                }}
            >
                <MenuItem>Скачать</MenuItem>
                <MenuItem onClick={copy}>Экспорт</MenuItem>
                <MenuItem onClick={() => setIsModalOpen(true)}>
                    Удалить
                </MenuItem>
            </Menu>

            <ConfirmationModal
                cancelText="Отменить"
                confirmationAction={() => {
                    deletePalylist();
                    setIsModalOpen(false);
                }}
                confirmationText="Удалить"
                open={isModalOpen}
                setOpen={setIsModalOpen}
                modalText="Удалить этот Плейлист?"
            />
        </Stack>
    );
});

export default PlaylistPage;
