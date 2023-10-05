import { Stack } from "@mui/material";
import AllPlaylistsHeader from "./AllPlaylistsHeader";
import PlaylistsSection from "../../components/playlist/PlaylistsSection";
import PlaylistCarousel from "../../components/playlist/PlaylistCarousel";
import { playlists } from "../../faker";
import { observer } from "mobx-react-lite";
import { useStores } from "../../root-store-context";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../../components/Navbar";

const AllPlaylistsPage = observer(() => {
  const { playlistsStore } = useStores();
  const { username } = useParams();

  useQuery(
    ["playlists", username],
    () => {
      return axios.get(`/playlists/user/${username}`);
    },
    {
      select: (data) => {
        return data.data;
      },
      onSuccess: (data) => {
        playlistsStore.setLikedPlaylists(data);
        playlistsStore.setAddedPlaylists(data);
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Stack
      height="100%"
      bgcolor="custom.bg.main"
      sx={{
        overflow: "auto",
        paddingBottom: "75px",
      }}
      color="text.primary"
    >
      <Navbar />
      <AllPlaylistsHeader />

      <Stack width="100%" alignItems="center">
        <Stack
          flexDirection="column"
          sx={{
            width: {
              xs: "95%",
              sm: "80%",
            },
          }}
        >
          <Stack
            width="100%"
            flexDirection="column"
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            <PlaylistCarousel
              playlists={playlistsStore.added_playlists}
              title="Ваши плейлисты"
              isOwnedPlaylists={true}
            />

            {playlistsStore.liked_playlists.length > 0 && (
              <PlaylistCarousel
                playlists={playlistsStore.liked_playlists}
                title="Нравится"
              />
            )}
          </Stack>

          <Stack
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
            width="100%"
            flexDirection="column"
          >
            <PlaylistsSection
              playlists={playlistsStore.added_playlists}
              title="Ваши плейлисты"
              isOwnedPlaylists={true}
            />

            {playlistsStore.liked_playlists.length > 0 && (
              <PlaylistsSection
                playlists={playlistsStore.liked_playlists}
                title="Нравится"
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
});

export default AllPlaylistsPage;
