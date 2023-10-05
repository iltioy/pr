import { Grid, Stack, Typography, Divider } from "@mui/material";
import PlaylistItem from "./PlaylistItem";
import { PlaylistType } from "../../types";
import CreatePlaylistItem from "./CreatePlaylistItem";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useStores } from "../../root-store-context";

interface PlaylistsSectionProps {
  title: string;
  playlists: PlaylistType[];
  isOwnedPlaylists?: boolean;
}

const PlaylistsSection: React.FC<PlaylistsSectionProps> = observer(
  ({ title, playlists, isOwnedPlaylists }) => {
    const { username } = useParams();
    const { userStore } = useStores();

    return (
      <>
        <Stack
          flexDirection="column"
          sx={{
            width: "100%",
            alignItems: "center",
          }}
          color="text.primary"
        >
          <Stack sx={{ width: "100%" }}>
            <Typography
              variant="h4"
              sx={{
                marginBottom: "10px",
              }}
              noWrap
            >
              {title}
            </Typography>
            <Divider
              sx={{
                marginBottom: "25px",
              }}
            />

            <Grid container spacing={2}>
              {playlists.map((playlist, index) => {
                if (
                  index === 0 &&
                  isOwnedPlaylists &&
                  username === userStore.user.username
                ) {
                  return (
                    <>
                      <Grid item key={index}>
                        <PlaylistItem playlist={playlist} />
                      </Grid>
                      <Grid item key="createPlaylistItem">
                        <CreatePlaylistItem />
                      </Grid>
                    </>
                  );
                }

                return (
                  <Grid item key={index}>
                    <PlaylistItem playlist={playlist} />
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        </Stack>
      </>
    );
  }
);

export default PlaylistsSection;
