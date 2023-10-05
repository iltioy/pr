import {
  Box,
  Skeleton,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { ImageType, PlaylistType } from "../../types";
import { observer } from "mobx-react-lite";
import { useTheme } from "@mui/material/styles";
import PressableButton from "../../components/MixSongsButton";
import PlaylistImage from "../../components/playlist/PlaylistImage";
import axios from "axios";
import { useStores } from "../../root-store-context";
import { handleUploadImage } from "../../queries/files";

interface EditPlaylistHeaderProps {
  playlist?: PlaylistType;
  handleOpenPlaylistSettings?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  isLoading?: boolean;
  playlistName: string;
  setPlaylistName: React.Dispatch<React.SetStateAction<string>>;
  playlistImage: ImageType;
  setPlaylistImage: React.Dispatch<React.SetStateAction<ImageType>>;
  handleSaveChanges: () => Promise<void>;
}

const EditPlaylistHeader: React.FC<EditPlaylistHeaderProps> = observer(
  ({
    playlist,
    isLoading,
    playlistName,
    setPlaylistName,
    playlistImage,
    setPlaylistImage,
    handleSaveChanges,
  }) => {
    const theme = useTheme();
    const [isEditingPlaylistName, setIsEditingPlaylistName] = useState(false);

    const handleUploadPlaylistImage = async (file: File) => {
      const image = await handleUploadImage(file);
      if (!image) return;
      setPlaylistImage(image);
    };

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
            background: `url(${
              playlistImage?.image_url || playlist?.image.image_url
            }) no-repeat center center fixed`,
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
            <PlaylistImage
              isEdit={true}
              playlistImage={playlistImage}
              handleUploadPlaylistImage={handleUploadPlaylistImage}
            />

            <Stack
              flexDirection="column"
              marginLeft="15px"
              sx={{
                overflow: "hidden",
                flex: 1,
              }}
            >
              {!isEditingPlaylistName ? (
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
                    cursor: "pointer",
                  }}
                  color="text.primary"
                  onClick={() => setIsEditingPlaylistName(true)}
                >
                  {playlistName}
                </Typography>
              ) : (
                <TextField
                  variant="standard"
                  size="medium"
                  sx={{
                    fontWeight: "bold",
                    // textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
                    textShadow: `1px 1px 10px ${
                      theme.palette.mode === "dark" ? "black" : "white"
                    }`,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                    input: {
                      fontSize: {
                        xs: "17px",
                        md: "37px",
                      },
                      fontWeight: "bold",
                    },
                  }}
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  onBlur={() => {
                    if (playlistName === "" && playlist) {
                      setPlaylistName(playlist.name);
                    }
                    setIsEditingPlaylistName(false);
                  }}
                  autoFocus
                />
              )}

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
                {playlist?.owner.username}
              </Typography>

              {/* <Box
              sx={{
                marginBottom: {
                  xs: "0px",
                  md: "20px",
                },
              }}
            >
              <IconButton>
                <FavoriteBorderIcon color="warning" />
              </IconButton>
              <IconButton onClick={handleOpenPlaylistSettings}>
                <MoreHorizIcon color="warning" />
              </IconButton>
            </Box> */}

              <Box marginTop="10px" onClick={() => handleSaveChanges()}>
                {/* <PressableButton text="Сохранить" /> */}
                <Button variant="contained" color="secondary">
                  Сохранить
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

export default EditPlaylistHeader;
