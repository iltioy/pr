import {
  Stack,
  IconButton,
  Box,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import { PlaylistType } from "../../types";
import { useTheme } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import PressableButton from "../../components/MixSongsButton";
import PlaylistImage from "../../components/playlist/PlaylistImage";
import { useStores } from "../../root-store-context";
import { useNavigate, useParams } from "react-router";
import { toggleFavoritePlaylist } from "../../queries/playlists";

interface PlaylistHeaderProps {
  playlist?: PlaylistType;
  handleOpenPlaylistSettings: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  isLoading?: boolean;
}

const PlaylistHeader = observer(
  ({
    playlist,
    handleOpenPlaylistSettings,
    isLoading,
  }: PlaylistHeaderProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { username } = useParams();

    const handleToggleFavoritePlaylist = () => {
      if (!playlist) return;
      toggleFavoritePlaylist(playlist.id, username);
    };

    const { userStore, playlistsStore, songsStore } = useStores();

    if (isLoading) {
      return (
        <Stack
          sx={{
            width: "100%",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: {
                xs: "200px",
                md: "300px",
              },
            }}
          />
        </Stack>
      );
    }

    return (
      <Stack
        sx={{
          width: "100%",
          alignItems: "center",
          position: "relative",
          height: {
            xs: "200px",
            md: "300px",
          },
          // paddingBottom: "50px",
        }}
      >
        <Stack
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 2,
            background: `url(${playlist?.image.image_url}) no-repeat center center fixed`,
            backgroundSize: "cover",
            filter: "blur(10px)",
          }}
        />
        <Stack
          sx={{
            width: {
              xs: "95%",
              sm: "80%",
            },
            height: "100%",
            zIndex: 3,
          }}
          justifyContent="center"
        >
          <Stack
            sx={{
              width: "100%",
              height: {
                xs: "125px",
                md: "200px",
              },
            }}
            flexDirection="row"
          >
            <PlaylistImage playlist={playlist} />

            <Stack
              flexDirection="column"
              paddingLeft="15px"
              sx={{
                overflow: "hidden",
                flex: 1,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontSize: {
                    xs: "20px",
                    md: "40px",
                  },
                  // textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
                  textShadow: `1px 1px 10px ${
                    theme.palette.mode === "dark" ? "black" : "white"
                  }`,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                color="text.primary"
              >
                {playlist?.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: {
                    xs: "17px",
                    md: "25px",
                  },
                  textShadow: `1px 1px 10px ${
                    theme.palette.mode === "dark" ? "black" : "white"
                  }`,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                color="text.primary"
              >
                {playlist?.owner?.username}
              </Typography>

              <Box
                sx={{
                  marginBottom: {
                    xs: "0px",
                    md: "20px",
                  },
                }}
              >
                {playlist &&
                playlistsStore.user_liked_playlists_ids?.includes(
                  playlist.id
                ) ? (
                  <IconButton onClick={() => handleToggleFavoritePlaylist()}>
                    <FavoriteIcon
                      sx={{
                        fontSize: {
                          xs: "17px",
                          md: "24px",
                        },
                      }}
                      color="warning"
                    />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleToggleFavoritePlaylist()}>
                    <FavoriteBorderIcon
                      sx={{
                        fontSize: {
                          xs: "17px",
                          md: "24px",
                        },
                      }}
                      color="warning"
                    />
                  </IconButton>
                )}

                <IconButton onClick={handleOpenPlaylistSettings}>
                  <MoreHorizIcon
                    sx={{
                      fontSize: {
                        xs: "17px",
                        md: "24px",
                      },
                    }}
                    color="warning"
                  />
                </IconButton>
                {playlist &&
                playlist.owner?.username === userStore.user.username ? (
                  <IconButton onClick={() => navigate("edit")}>
                    <EditIcon
                      sx={{
                        fontSize: {
                          xs: "17px",
                          md: "24px",
                        },
                      }}
                      color="warning"
                    />
                  </IconButton>
                ) : null}
              </Box>

              <Box
                onClick={() => {
                  if (playlist) {
                    songsStore.setSongQueue(playlist);
                    songsStore.shuffleSongQueue();
                  }
                }}
              >
                <PressableButton text="Перемешать" icon="play" />
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

export default PlaylistHeader;
