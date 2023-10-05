import { Stack, Typography, Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IosShareIcon from "@mui/icons-material/IosShare";
import useHold from "../../hooks/useHold";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { PlaylistType } from "../../types";
import { useNavigate, useParams } from "react-router";
import { observer } from "mobx-react-lite";
import { useStores } from "../../root-store-context";
import { toggleFavoritePlaylist } from "../../queries/playlists";

interface PlaylistItemIconsProps {
  playlist: PlaylistType;
}

const PlaylistItemIcons: React.FC<PlaylistItemIconsProps> = observer(
  ({ playlist }) => {
    const { ref: favIconRef, scale: favIconScale } = useHold({
      size: 0.9,
      initialScale: 1.15,
    });

    const { ref: shareIconRef, scale: shareIconScale } = useHold({
      size: 0.9,
      initialScale: 1.15,
    });

    const { playlistsStore } = useStores();
    const { username } = useParams();

    const handleToggleFavoritePlaylist = () => {
      toggleFavoritePlaylist(playlist.id, username);
    };

    return (
      <>
        <Stack
          width="100%"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          gap="10px"
        >
          <Stack
            sx={{
              background: "black",
              opacity: 0.8,
              width: "42px",
              height: "42px",
              display: "flex",
              borderRadius: "50%",
              justifyContent: "center",
              alignItems: "center",
              transition: "0.3s",
              ":hover": {
                transform: `scale(${favIconScale})`,
              },
            }}
            ref={favIconRef}
          >
            {playlistsStore.user_liked_playlists_ids?.includes(playlist.id) ? (
              <FavoriteIcon
                htmlColor="white"
                sx={{
                  width: "25px",
                  height: "25px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavoritePlaylist();
                }}
              />
            ) : (
              <FavoriteBorderIcon
                htmlColor="white"
                sx={{
                  width: "25px",
                  height: "25px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavoritePlaylist();
                }}
              />
            )}
          </Stack>
          <Stack
            sx={{
              background: "orange",
              width: "55px",
              height: "55px",
              display: "flex",
              borderRadius: "50%",
              justifyContent: "center",
              alignItems: "center",
              transition: "0.3s",
              ":hover": {
                transform: "scale(1.15)",
              },
            }}
          >
            <PlayArrowIcon
              sx={{
                width: "30px",
                height: "30px",
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </Stack>
          <Stack
            sx={{
              background: "black",
              opacity: 0.8,
              width: "42px",
              height: "42px",
              display: "flex",
              borderRadius: "50%",
              justifyContent: "center",
              alignItems: "center",
              transition: "0.3s",
              ":hover": {
                transform: `scale(${shareIconScale})`,
              },
            }}
            ref={shareIconRef}
          >
            <IosShareIcon
              htmlColor="white"
              sx={{
                width: "25px",
                height: "25px",
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </Stack>
        </Stack>
      </>
    );
  }
);

interface PlaylisyItemProps {
  playlist: PlaylistType;
}

const PlaylistItem: React.FC<PlaylisyItemProps> = observer(({ playlist }) => {
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        height: "290px",
        width: "230px",
        borderRadius: "5px",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        cursor: "pointer",
        ":hover .hoverPlaylistItem": {
          display: "flex",
        },
      }}
      color="text.primary"
      onClick={() => {
        navigate(`/${playlist.owner.username}/playlist/${playlist.id}`);
      }}
    >
      <Stack
        className="hoverPlaylistItem"
        sx={{
          position: "absolute",
          zIndex: 2,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "none",
          border: "3px solid orange",
          justifyContent: "center",
        }}
      />

      <Stack
        sx={{
          height: "260px",
          width: "220px",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Stack
          sx={{
            height: "200px",
            width: "200px",
            marginBottom: "5px",
            position: "relative",
          }}
        >
          <img
            src={playlist.image.image_url}
            alt=""
            style={{
              objectFit: "cover",
              height: "100%",
              width: "100%",
            }}
          />

          <Stack
            className="hoverPlaylistItem"
            sx={{
              position: "absolute",
              zIndex: 3,
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              display: "none",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PlaylistItemIcons playlist={playlist} />
          </Stack>
        </Stack>

        <Typography width="200px" noWrap>
          {playlist.name}
        </Typography>
      </Stack>
    </Stack>
  );
});

export default PlaylistItem;
