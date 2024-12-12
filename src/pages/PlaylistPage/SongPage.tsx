import { Stack, Menu, MenuItem, Skeleton } from "@mui/material";
import "./playlistPage.styles.css";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistSongs from "./PlaylistSongs";
import useMenu from "../../hooks/useMenu";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router";
import { Song, Playlist } from "../../types";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Navbar from "../../components/Navbar";

const SongPage = observer(() => {
    const { songId } = useParams();
    const [songs, setSongs] = useState<Song[]>([]);
    // const [playlist, setPlaylist] = useState<PlaylistType | null>(null)

    const { data: playlist, isLoading } = useQuery(
        ["playlist", songId],
        () => {
            return axios.get(`/songs/${songId}`);
        },
        {
            select: (data) => {
                const song: Song = data.data;
                let mockPlaylist: Playlist = {
                    id: 0,
                    image_url: song.image_url,
                    name: song.name,
                    order: 0,
                    owner: song.owner,
                    songs: [song],
                };
                return mockPlaylist;
            },
            onSuccess: (data: Playlist) => {
                setSongs(data.songs);
            },
            refetchOnWindowFocus: false,
        }
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
                    isSongPlaylist
                />

                <PlaylistSongs
                    playlist={playlist}
                    data={songs}
                    isLoading={isLoading}
                    isSongPage
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
                <MenuItem>Экспорт</MenuItem>
                <MenuItem></MenuItem>
            </Menu>
        </Stack>
    );
});

export default SongPage;
