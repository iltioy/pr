import { Stack, Menu, MenuItem, Skeleton } from "@mui/material";
import "./playlistPage.styles.css";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistSongs from "./PlaylistSongs";
import useMenu from "../../hooks/useMenu";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router";
import { OrderedSongType, PlaylistType, SongType } from "../../types";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Navbar from "../../components/Navbar";

const PlaylistPage = observer(() => {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState<SongType[]>([]);

  const extractSongsFromOrderdSongs = (playlist?: PlaylistType) => {
    if (!playlist) return;
    const orderedSongs: OrderedSongType[] = playlist.songs;
    const newSongs: SongType[] = [];
    orderedSongs.map((orderedSong) => {
      newSongs.push(orderedSong.song);
    });

    setSongs(newSongs);
  };

  const { data: playlist, isLoading } = useQuery(
    ["playlist", playlistId],
    () => {
      return axios.get(`/playlists/${playlistId}`);
    },
    {
      select: (data) => {
        const playlist: PlaylistType = data.data;
        return playlist;
      },
      onSuccess: (data) => {
        extractSongsFromOrderdSongs(data);
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
        />

        <PlaylistSongs playlist={playlist} data={songs} isLoading={isLoading} />
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

export default PlaylistPage;
