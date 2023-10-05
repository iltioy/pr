import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import EditPlaylistHeader from "./EditPlaylistHeader";
import { observer } from "mobx-react-lite";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import {
  ImageType,
  OrderedSongType,
  PlaylistType,
  SongType,
} from "../../types";
import "../PlaylistPage/playlistPage.styles.css";
import { useStores } from "../../root-store-context";
import Navbar from "../../components/Navbar";
import PlaylistSongs from "../PlaylistPage/PlaylistSongs";

const EditPlaylistPage = observer(() => {
  const { playlistId } = useParams();
  const [playlistName, setPlaylistName] = useState("");
  const [playlistImage, setPlaylistImage] = useState<ImageType>({});
  const [songs, setSongs] = useState<SongType[]>([]);

  const { userStore } = useStores();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
        if (playlistName === "" && !playlistImage.image_url) {
          setPlaylistName(data.name);
          setPlaylistImage(data.image);
        }
        extractSongsFromOrderdSongs(data);
      },
      refetchOnWindowFocus: false,
    }
  );

  const handleSaveChanges = async () => {
    try {
      if (!playlist) return;

      await axios.patch(
        `/playlists/update/${playlist.id}`,
        {
          name: playlistName,
          image_url: playlistImage.image_url,
          image_key: playlistImage.image_key,
        },
        {
          headers: {
            Authorization: `Bearer ${userStore.access_token}`,
          },
        }
      );

      queryClient.invalidateQueries({
        queryKey: ["playlist", playlist.id],
      });
      navigate(`/${playlist.owner.username}/playlist/${playlist.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const extractSongsFromOrderdSongs = (playlist?: PlaylistType) => {
    if (!playlist) return;
    const orderedSongs: OrderedSongType[] = playlist.songs;
    const newSongs: SongType[] = [];
    orderedSongs.map((orderedSong) => {
      newSongs.push(orderedSong.song);
    });

    setSongs(newSongs);
  };

  useEffect(() => {
    if (playlist && userStore.user.username !== playlist.owner.username) {
      navigate(`/${playlist.owner.username}/playlist/${playlist.id}`);
    }
  }, [userStore.user.username, playlist]);

  return (
    <>
      <Stack
        height="100%"
        flexDirection="column"
        bgcolor="custom.bg.main"
        overflow="auto"
        paddingBottom="50px"
      >
        <Navbar />

        <Stack flexDirection="column">
          <EditPlaylistHeader
            // playlist={playlist}
            isLoading={isLoading}
            playlist={playlist}
            playlistName={playlistName}
            setPlaylistName={setPlaylistName}
            playlistImage={playlistImage}
            setPlaylistImage={setPlaylistImage}
            handleSaveChanges={handleSaveChanges}
          />

          <PlaylistSongs isEdit data={songs} isLoading={isLoading} />
        </Stack>
        {/* <Menu
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
      </Menu> */}
      </Stack>
    </>
  );
});

export default EditPlaylistPage;
