import {
  Grid,
  Stack,
  IconButton,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PlaylistType, SongType } from "../types";
import { SxProps, Theme } from "@mui/material";
import useMenu from "../hooks/useMenu";
import { observer } from "mobx-react-lite";
import { useStores } from "../root-store-context";
import { toggleLikeSong } from "../queries/songs";

interface SongRecordProps {
  song: SongType;

  sx?: SxProps<Theme> | undefined;
  search?: boolean;
  songContext?: PlaylistType;
}

const SongRecord = observer(
  ({ song, sx, search, songContext }: SongRecordProps) => {
    const {
      handleClose: handleCloseSongSettings,
      handleOpen: handleOpenSongSettings,
      isOpen: isSongSettingOpen,
      anchorElement: songSettingsAnchorElement,
    } = useMenu();

    const { songsStore } = useStores();

    return (
      <>
        <Stack
          bgcolor="custom.bg.secondary"
          sx={{
            border: "1px solid grey",
            height: "74px",
            borderRadius: 1,
            marginBottom: "5px",
            ":last-child": {
              marginBottom: 0,
            },
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
            overflow: "hidden",
            ...sx,
          }}
          onClick={() => {
            songsStore.setCurrentSong(song);
            if (songContext) {
              songsStore.setSongQueue(songContext);
            }
          }}
        >
          <img
            src={song.image.image_url}
            style={{
              height: "50px",
              width: "50px",
              objectFit: "fill",
              borderRadius: "5px",
              marginLeft: "12px",
            }}
            alt=""
          />
          <Grid
            sx={{
              height: "50px",
              paddingLeft: "20px",
              width: "calc(100% - 62px)",
            }}
            container
          >
            <Grid item xs={12} sm={8} md={6}>
              <Typography
                sx={{
                  fontWeight: "bold",

                  maxWidth: "100%",
                }}
                noWrap
              >
                {song.name.slice(0, 30)}
                {song.name.length > 30 ? "..." : ""}
              </Typography>
              <Typography
                variant="caption"
                color={`${search ? "grey" : "text.secondary"}`}
                maxWidth="100%"
                display="block"
                noWrap
              >
                {song.author}
              </Typography>
            </Grid>
            <Grid
              md={2}
              display={{
                xs: "none",
                md: "block",
              }}
              overflow="hidden"
              paddingRight="10px"
              item
            >
              {song.album?.slice(0, 30)}
            </Grid>

            <Grid
              item
              md="auto"
              justifySelf="flex-end"
              marginLeft="auto"
              marginRight="20px"
              display={{
                xs: "none",
                sm: "block",
              }}
            >
              <Box height="100%" display="flex" alignItems="center">
                {songsStore.liked_songs_ids?.includes(song.id) ? (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLikeSong(song.id);
                    }}
                  >
                    <FavoriteIcon htmlColor={`${search && "white"}`} />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLikeSong(song.id);
                    }}
                  >
                    <FavoriteBorderIcon htmlColor={`${search && "white"}`} />
                  </IconButton>
                )}

                <IconButton
                  sx={{
                    marginLeft: "15px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenSongSettings && handleOpenSongSettings(e);
                  }}
                >
                  <MoreVertIcon htmlColor={`${search && "white"}`} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Stack>
        <Menu
          open={isSongSettingOpen}
          anchorEl={songSettingsAnchorElement}
          onClose={handleCloseSongSettings}
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
        </Menu>
      </>
    );
  }
);

export default SongRecord;
